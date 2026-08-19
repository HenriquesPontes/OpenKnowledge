import { geoMercator, geoPath } from 'd3-geo'
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import { rewindForD3 } from '@/lib/rewind-geo'

export type PathData = {
  id: string
  name: string
  d: string
  centroid: [number, number]
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
      markers: MARKER_COUNTRIES.has(id)
        ? islandCentroids(drawable.geometry, generator)
        : [],
      subregion:
        typeof feature.properties?.subregion === 'string'
          ? feature.properties.subregion
          : '',
    })
  }

  return { width, height, paths }
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
