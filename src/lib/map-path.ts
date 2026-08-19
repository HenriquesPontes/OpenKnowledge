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

const ATTR = /(?:^|\s)([a-zA-Z_:][\w:.-]*)="([^"]*)"/g

function tagAttrs(tag: string) {
  const attrs: Record<string, string> = {}
  for (const match of tag.matchAll(ATTR)) {
    attrs[match[1]] = match[2]
  }
  return attrs
}

function groupInner(svgText: string, id: string) {
  const match = svgText.match(
    new RegExp(`<g\\b[^>]*\\bid="${id}"[^>]*>([\\s\\S]*?)</g>`, 'i'),
  )
  return match?.[1] ?? ''
}

function centroidFromPathD(d: string): [number, number] {
  const nums = [...d.matchAll(/-?\d+(?:\.\d+)?/g)].map(Number)
  let sx = 0
  let sy = 0
  let count = 0
  for (let i = 0; i + 1 < nums.length; i += 2) {
    sx += nums[i]
    sy += nums[i + 1]
    count += 1
  }
  return count > 0 ? [sx / count, sy / count] : [500, 500]
}

export function parseCountrySvgLayout(
  svgText: string,
  subregion = '',
): MapLayout | null {
  const view = svgText.match(/viewbox="([^"]+)"/i)
  if (!view) return null
  const parts = view[1].trim().split(/[\s,]+/).map(Number)
  if (parts.length < 4 || parts.some((value) => Number.isNaN(value))) return null
  const width = parts[2]
  const height = parts[3]
  const features = groupInner(svgText, 'features')
  if (!features) return null

  const labels = new Map<string, [number, number]>()
  for (const match of groupInner(svgText, 'label_points').matchAll(
    /<circle\b([^>]*)>/gi,
  )) {
    const attrs = tagAttrs(match[1])
    const id = attrs.id
    const cx = Number(attrs.cx)
    const cy = Number(attrs.cy)
    if (!id || Number.isNaN(cx) || Number.isNaN(cy)) continue
    labels.set(id, [cx, cy])
  }

  const paths: PathData[] = []
  for (const match of features.matchAll(/<path\b([^>]*)>/gi)) {
    const attrs = tagAttrs(match[1])
    if (!attrs.d || !attrs.id) continue
    const centroid = labels.get(attrs.id) ?? centroidFromPathD(attrs.d)
    paths.push({
      id: attrs.id,
      name: attrs.name ?? attrs.id,
      d: attrs.d,
      centroid,
      lngLat: centroid,
      markers: [],
      subregion,
    })
  }

  if (paths.length === 0) return null

  return {
    width,
    height,
    paths,
    project: () => null,
  }
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
