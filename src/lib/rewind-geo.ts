import type { Feature, FeatureCollection, Geometry, Position } from 'geojson'

function shoelace(ring: Position[]) {
  let sum = 0
  for (let i = 0, n = ring.length - 1; i < n; i += 1) {
    const [x0, y0] = ring[i]
    const [x1, y1] = ring[i + 1]
    sum += x0 * y1 - x1 * y0
  }
  return sum
}

function isCcw(ring: Position[]) {
  return shoelace(ring) > 0
}

function ensureWinding(ring: Position[], wantCcw: boolean) {
  return isCcw(ring) === wantCcw ? ring : ring.slice().reverse()
}

function rewindGeometry(geometry: Geometry): Geometry {
  if (geometry.type === 'Polygon') {
    return {
      type: 'Polygon',
      coordinates: geometry.coordinates.map((ring, index) =>
        ensureWinding(ring, index !== 0),
      ),
    }
  }

  if (geometry.type === 'MultiPolygon') {
    return {
      type: 'MultiPolygon',
      coordinates: geometry.coordinates.map((polygon) =>
        polygon.map((ring, index) => ensureWinding(ring, index !== 0)),
      ),
    }
  }

  if (geometry.type === 'GeometryCollection') {
    return {
      type: 'GeometryCollection',
      geometries: geometry.geometries.map(rewindGeometry),
    }
  }

  return geometry
}

/**
 * d3-geo treats counterclockwise exteriors as the *outside* of the sphere
 * (the whole globe). geoBoundaries / RFC 7946 files are often CCW, so each
 * district becomes an invisible speck. Clockwise exteriors project as land.
 */
export function rewindForD3<P>(
  collection: FeatureCollection<Geometry, P>,
): FeatureCollection<Geometry, P> {
  return {
    type: 'FeatureCollection',
    features: collection.features.map((feature) => ({
      ...feature,
      geometry: rewindGeometry(feature.geometry),
    })) as Feature<Geometry, P>[],
  }
}
