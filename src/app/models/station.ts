import {Geometry} from "@app/models/geometry";
import {Count} from "@app/models/count";

export interface Station {
  uuid: string
  longitude: number
  latitude: number
  address: string
  name: string
  latLng: string
  isStop: boolean
  createdAt: string
  updatedAt: string
  geometry: Geometry[]
  _count: Count
  coordinate_uuid: string
}
