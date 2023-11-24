import {Geopoint} from "./geopoint";
import {icon, marker, polyline} from 'leaflet';

export class Destination {
  private name: string;
  private description: string = "";
  private departure_point?: Geopoint;
  private arrival_point?: Geopoint;
  private overlays = {} as any; // permet de stocker les overlays (markers, polylines, etc.)
  private route: [number, number][] = []; // polyline (array de Geopoint)
  private color: string = "red";

  constructor(name: string, description: string, route: [number, number][]) {
    this.name = name;
    this.description = description;
    this.route = route;
  }

  set setColor(color: string) {
    this.color = color;
  }

  set setName(name: string) {
    this.name = name;
  }

  set setDescription(description: string) {
    this.description = description;
  }

  set setDeparturePoint(departure_point: Geopoint) {
    this.departure_point = departure_point;
  }

  set setArrivalPoint(arrival_point: Geopoint) {
    this.arrival_point = arrival_point;
  }

  set setOverlays(overlays: any) {
    this.overlays = {...overlays};
  }

  set setRoute(route: [number, number][]) {
    this.route = [...route];
  }


  get getName(): string {
    return this.name;
  }

  get getDescription(): string {
    return this.description;
  }

  get getDeparturePoint(): any {

    return marker([this.departure_point!.latitude, this.departure_point!.longitude], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }

  get getArrivalPoint(): any {
    return marker([this.arrival_point!.latitude, this.arrival_point!.longitude], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png'
      })
    });
  }

  get getOverlays(): any {
    return {
      "Departure": this.getDeparturePoint,
      'Arrival': this.getArrivalPoint,
      'Route': this.getPolylineRoute,
    }
  }

  get getPolylineRoute(): any {
    return polyline(
      this.route,
      {
        color: this.color,
      });
  }

  get getRoute(): [number, number][] {
    return this.route;
  }



}
