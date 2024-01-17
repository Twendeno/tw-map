import {inject, Injectable, signal} from '@angular/core';
import {Geopoint} from "@app/models/geopoint";
import 'leaflet';
import 'leaflet.markercluster';
import * as Leaflet from 'leaflet';

import line1 from '@assets/datas/datapn.json';
import cgGeo from '@assets/datas/geo-cg.json';
import {ClusterMapService} from "@app/services/cluster-map.service";
import {LayerMaps} from "@app/models/layer-maps";

@Injectable({
  providedIn: 'root',
})
export class MapsService {

  map!: Leaflet.Map;
  zoom:number = 14.5;
  zoomMax:number = 20;
  zoomMin:number = 1;

  readonly clusterMapService: ClusterMapService = inject(ClusterMapService);

  center = Leaflet.latLng(-4.798426305004817, 11.846419529932914);//PN

  private myCurrentPosition= signal<Geopoint>({
    name: "My current position",
    longitude: 0,
    latitude: 0,
    latLong: [0, 0]
  } as Geopoint);

  currentLayer = LayerMaps.streetMaps
  layers: Leaflet.Layer[] = [
    this.currentLayer
  ];

  options = {
    zoomControl: false,
    minZoom: this.zoomMin,
    maxZoom: this.zoomMax
  };


  myIcon = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png'
  })

  constructor() {}

  onMapReady(map: Leaflet.Map) {
    this.map= map;
    map.setZoom(this.zoom);

    // Recuparation de la position de l'utilisateur
    map.on('locationfound', (e: any) => {

      this.myCurrentPosition.set( {
        name: "My current position",
        longitude: e.latitude,
        latitude: e.longitude,
        latLong: [e.latitude, e.longitude]
      });

    });

    this.clusterMapService.addMarkerCluster(line1.geometry.coordinates, this.myIcon)

    this.addGeoJSONLayer(cgGeo);

  }

  addGeoJSONLayer(geojsonData: any) {
    Leaflet.geoJSON(geojsonData, {
      style: (feature) => ({
        weight: 2,
        opacity: 1,
        color: '#C43302',
        fillOpacity: 0.8,
        fillColor: '#026E81',
        dashArray: '2, 5'
      }),
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
      }
    }).addTo(this.map);
  }


  zoomIn(): void {
    this.zoom = this.zoom >= this.zoomMax ? this.zoomMax : this.zoom + 0.5;
  }

  zoomOut(): void {
    this.zoom = this.zoom <= this.zoomMin ? this.zoomMin : this.zoom - 0.5;
  }

  nextLayer(): void {
    switch (this.currentLayer) {
      case LayerMaps.mainLayer: {
        this.currentLayer = LayerMaps.mainLayer;
        break;
      }
      case LayerMaps.streetMaps: {
        this.currentLayer = LayerMaps.streetMaps;
        break;
      }
      case LayerMaps.openstreetmapHot: {
        this.currentLayer = LayerMaps.openstreetmapHot;
        break;
      }
      case LayerMaps.openstreetmapOsm: {
        this.currentLayer = LayerMaps.openstreetmapOsm;
        break;
      }
      case LayerMaps.layer_ArcGISGray: {
        this.currentLayer = LayerMaps.layer_ArcGISGray;
        break;
      }
      case LayerMaps.layer_OpenStreetMap: {
        this.currentLayer = LayerMaps.layer_OpenStreetMap;
        break;
      }
      case LayerMaps.layer_ArcGISStreets: {
        this.currentLayer = LayerMaps.layer_ArcGISStreets;
        break;
      }
      case LayerMaps.layer_ArcGISSatellite: {
        this.currentLayer = LayerMaps.layer_ArcGISSatellite;
        break;
      }
    }
    this._updateLayers();
  }

  _updateLayers() {
    this.layers = [this.currentLayer];
  }


  /**
   * Afficher la position de l'utilisateur sur la carte
   * centre la carte sur la position de l'utilisateur
   */
  showMyCurrentPosition() : void {
    this.center = Leaflet.latLng(this.myCurrentPosition().latitude, this.myCurrentPosition().longitude);

    this.map.locate({setView: true, maxZoom: this.zoomMax});

    const markerText: string = `<br><span>Name: <span class="text-blue-900">Vous etes ici </b></span></span>`;

    Leaflet.marker(this.myCurrentPosition().latLong,{icon:this.myIcon})
      .addTo(this.map)
      .bindPopup(markerText)
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, {draggable: data.draggable})
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
