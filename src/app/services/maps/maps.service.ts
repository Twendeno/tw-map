import {Injectable, signal} from '@angular/core';
import {Geopoint} from "@app/models/geopoint";
import 'leaflet';
import 'leaflet.markercluster';
import * as Leaflet from 'leaflet';
import {tileLayer} from 'leaflet';

import GEOJSON_PN from '@assets/datas/geo-cg.json';

@Injectable({
  providedIn: 'root',
})
export class MapsService {

  map!: Leaflet.Map;
  zoom: number = 15;
  zoomMax: number = 17;
  zoomMin: number = 3;

  readonly mainLayer = tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
    detectRetina: true,
    minZoom: this.zoomMin
  })

// Openstreetmap Layer
  readonly streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">openstreetmap</a>',
    detectRetina: true,
    minZoom: this.zoomMin
  });


  center = Leaflet.latLng(-4.798426305004817, 11.846419529932914);//PN

  private myCurrentPosition = signal<Geopoint>({
    name: "My current position",
    longitude: 0,
    latitude: 0,
    latLong: [0, 0]
  } as Geopoint);

  currentLayer = this.streetMaps
  layers: Leaflet.Layer[] = [
    this.currentLayer
  ];

  options = {
    zoomControl: false,
    zoom: this.zoom,
    minZoom: this.zoomMin,
    maxZoom: this.zoomMax,
    baseLayers: {
      'Wikimedia': this.mainLayer,
      'OpenStreetMap': this.streetMaps
    }
  };


  myIcon = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png'
  })

  constructor() {
  }

  onMapReady(map: Leaflet.Map) {
    this.map = map;
    map.setZoom(this.zoom);

    // Recuparation de la position de l'utilisateur
    map.on('locationfound', (e: any) => {

      this.myCurrentPosition.set({
        name: "My current position",
        longitude: e.latitude,
        latitude: e.longitude,
        latLong: [e.latitude, e.longitude]
      });

    });

    this.addGeoJSONLayer(GEOJSON_PN);

  }

  /**
   * @Title
   * Ajouter une couche GeoJSON sur la carte
   *
   * @Description
   * cette fonction prend en parametre un geojson parse en json,
   * une couleur en hexadecimal, un boolean pour activer ou desactiver le dashArray
   * et un nombre pour la largeur de la ligne
   * @param geojsonData
   * @param color
   * @param isDashArray
   * @param weight
   *
   * @returns void
   */
  addGeoJSONLayer(geojsonData: any, color: string = '#C43302', isDashArray: boolean = true, weight: number = 2) {
    return Leaflet.geoJSON(geojsonData, {
      style: (feature) => ({
        weight: weight,
        opacity: 1,
        color: color,
        fillOpacity: 0.8,
        fillColor: '#026E81',
        dashArray: isDashArray ? '2, 5' : ''
      }),
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name).bindTooltip(feature.properties.name);
        }
      }
    }).addTo(this.map);
  }

  clearMap() {
    this.map.eachLayer((layer) => {
      if (layer instanceof Leaflet.GeoJSON) {
        this.map.removeLayer(layer);
      }
    });
  }

  // Supprimer le GeoJSON Layer spécifique
  removeSpecificLayer(myGeoJSONLayer: Leaflet.GeoJSON) {
    this.map.removeLayer(myGeoJSONLayer);
  }


  zoomIn(): void {
    this.zoom = this.zoom >= this.zoomMax ? this.zoomMax : this.zoom + 1;
  }

  zoomOut(): void {
    this.zoom = this.zoom <= this.zoomMin ? this.zoomMin : this.zoom - 1;
  }

  nextLayer(): void {
    switch (this.currentLayer) {
      case this.mainLayer: {
        this.currentLayer = this.streetMaps;
        break;
      }
      case this.streetMaps: {
        this.currentLayer = this.mainLayer;
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
  showMyCurrentPosition(): void {
    this.center = Leaflet.latLng(this.myCurrentPosition().latitude, this.myCurrentPosition().longitude);

    this.map.locate({setView: true, maxZoom: this.zoomMax});

    const markerText: string = `<br><span>Name: <span class="text-blue-900">Vous etes ici </b></span></span>`;

    Leaflet.marker(this.myCurrentPosition().latLong, {icon: this.myIcon})
      .addTo(this.map)
      .bindPopup(markerText)
  }

}
