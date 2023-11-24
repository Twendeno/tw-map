import {Injectable, signal} from '@angular/core';
import {Map, marker, tileLayer, control, point, icon} from 'leaflet';
import {Geopoint} from "@app/models/geopoint";


import datas1Json from '@assets/datas1.json';
import datas2Json from '@assets/datas2.json';
import datas3Json from '@assets/datapn.json';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  private map!: Map;
  private markers = [];
  private myCurrentPosition= signal<Geopoint>({
    name: "My current position",
    longitude: 0,
    latitude: 0,
    latLong: [0, 0]
  } as Geopoint);

  // Wikimedia
  mainLayer = tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    minZoom: 1,
    detectRetina: true,
    maxZoom: 19
  });

  // Openstreetmap Layer
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    detectRetina: true,
  });


  // Openstreetmap Hot
  openstreetmapHot = tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    detectRetina: true,
  })

  // Openstreetmap Osm
  openstreetmapOsm = tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    detectRetina: true,
  })

  constructor() {

  }

  get getMyCurrentPosition(): Geopoint {
    return this.myCurrentPosition();
  }
  onMapReady(map: Map) {
    this.map= map;

    map.locate({setView: true, maxZoom: 16});

    // Recuparation de la position de l'utilisateur
    map.on('locationfound', (e: any) => {

      this.myCurrentPosition.set( {
        name: "My current position",
        longitude: e.latitude,
        latitude: e.longitude,
        latLong: [e.latitude, e.longitude]
      });

      marker(this.myCurrentPosition().latLong , {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }).addTo(map)
    });

    map.on('locationerror', (e: any) => {
      console.log(e);
    });

    // this.destination.getRoute.map((data, index) => {
    //   marker(data).addTo(map);
    // });

  }

  get datas1(): [number, number][] {
    return datas1Json as [number,number][];
  }
  get datas2(): [number, number][] {
    return datas2Json as [number,number][];
  }

  get datas3(): [number, number][] {
    return datas3Json as [number,number][];
  }

  get datas(): [number, number][][] {
    return [...[],datas1Json as [number,number][], datas2Json as [number,number][]]
    ;
  }

  set setMap(map: Map) {
    this.map = map;
  }

  get getMap(): Map {
    return this.map;
  }

  generateMarker(data: any, index: number) {
    return marker(data.position, {draggable: data.draggable})
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  }
}
