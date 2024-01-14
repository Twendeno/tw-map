export class Geometry {
  uuid: string;
  type: string;
  name: string;
  reference: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    uuid: string,
    type: string,
    name: string,
    reference: string,
    createdAt: string,
    updatedAt: string) {
    this.uuid = uuid;
    this.type = type;
    this.name = name;
    this.reference = reference;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
