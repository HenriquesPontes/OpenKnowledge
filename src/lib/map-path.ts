import { geoCentroid, geoMercator, geoPath } from 'd3-geo'
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import { rewindForD3 } from '@/lib/rewind-geo'

export type PathData = {
  id: string
  name: string
  d: string
  centroid: [number, number]
  lngLat: [number, number]
  markers: [number, number][]
  subregion: string
}

export type FeatureIdResolver = {
  id: (properties: GeoJsonProperties) => string | null
  name: (properties: GeoJsonProperties, id: string) => string
}

export type MapLayout = {
  width: number
  height: number
  paths: PathData[]
  project: (lon: number, lat: number) => [number, number] | null
}

const MARKER_COUNTRIES = new Set(['ST', 'CV'])

export function buildMapLayout(
  collection: FeatureCollection<Geometry, GeoJsonProperties>,
  resolver: FeatureIdResolver,
  width: number,
  height: number,
  padding = 40,
): MapLayout {
  const rewound = rewindForD3(collection)
  const projection = geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    rewound,
  )
  const generator = geoPath(projection)
  const paths: PathData[] = []

  for (const feature of rewound.features) {
    const id = resolver.id(feature.properties)
    if (!id) continue
    const drawable = feature as Feature<Geometry>
    const d = generator(drawable)
    if (!d) continue
    paths.push({
      id,
      name: resolver.name(feature.properties, id),
      d,
      centroid: generator.centroid(drawable),
      lngLat: geoCentroid(drawable) as [number, number],
      markers: MARKER_COUNTRIES.has(id)
        ? islandCentroids(drawable.geometry, generator)
        : [],
      subregion:
        typeof feature.properties?.subregion === 'string'
          ? feature.properties.subregion
          : '',
    })
  }

  return {
    width,
    height,
    paths,
    project: (lon, lat) => {
      const point = projection([lon, lat])
      return point ? [point[0], point[1]] : null
    },
  }
}

export function buildFocusLayout(
  collection: FeatureCollection<Geometry, GeoJsonProperties>,
  resolver: FeatureIdResolver,
  countryId: string,
  width: number,
  height: number,
  padding = 28,
): MapLayout {
  const feature = collection.features.find(
    (item) => resolver.id(item.properties) === countryId,
  )
  if (!feature?.geometry) {
    return {
      width,
      height,
      paths: [],
      project: () => null,
    }
  }

  const coordinates =
    feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates]
      : feature.geometry.type === 'MultiPolygon'
        ? feature.geometry.coordinates
        : []

  const parts: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: coordinates.map((polygon, index) => ({
      type: 'Feature',
      properties: {
        ...feature.properties,
        id: `${countryId}:${index}`,
        name: resolver.name(feature.properties, countryId),
      },
      geometry: { type: 'Polygon', coordinates: polygon },
    })),
  }

  return buildMapLayout(
    parts,
    {
      id: (properties) => {
        const value = properties?.id
        return typeof value === 'string' && value.length > 0 ? value : null
      },
      name: (properties, id) => String(properties?.name ?? id),
    },
    width,
    height,
    padding,
  )
}

function islandCentroids(
  geometry: Geometry,
  generator: ReturnType<typeof geoPath>,
): [number, number][] {
  const polygons =
    geometry.type === 'Polygon'
      ? [geometry.coordinates]
      : geometry.type === 'MultiPolygon'
        ? geometry.coordinates
        : []

  return polygons.map((coordinates) =>
    generator.centroid({
      type: 'Feature',
      properties: {},
      geometry: { type: 'Polygon', coordinates },
    }),
  )
}
