export interface GeojsonData {
  type: string
  features: Feature[]
}
export interface Feature {
  type: string
  geometry: Geometry
  properties: Properties
}

interface Geometry {
  coordinates: number[][]
  type: string
}

interface Properties {
  name: string
  color: string
}
