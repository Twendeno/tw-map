import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import {MapsService} from '../services/maps.service';
import {Destination} from "@app/models/destination";
import {Geopoint} from "@app/models/geopoint";

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {

  readonly mapService: MapsService = inject(MapsService);

  private destination: Destination = new Destination("test", "test", this.mapService.datas1);
  private destination2: Destination = new Destination("test", "test", this.mapService.datas2);
  private destination3: Destination = new Destination("pn", "test", this.mapService.datas3);

  layersControl: any;
  options: any;

  //mydata = dataJson[3]["geo_shape"]["geometry"]["coordinates"]

  departure: Geopoint = {
    name: "test departure",
    longitude: -0.6339189,
    latitude: 44.8302238,
    latLong: [-0.6339189, 44.8302238]
  }

  arrival: Geopoint = {
    name: "test arrival",
    longitude: -0.6316994,
    latitude: 44.8299564,
    latLong: [-0.6316994, 44.8299564]
  }

  constructor() {
  }

  ngOnInit(): void {

    this.destination2.setColor = "blue";

    this.destination.setArrivalPoint = this.arrival;
    this.destination.setDeparturePoint = this.departure;

    this.layersControl = {
      baseLayers: {
        'Street Maps': this.mapService.streetMaps,
        'Wikimedia Maps': this.mapService.mainLayer,
        "Open streetmap Hot": this.mapService.openstreetmapHot,
        "Open streetmap Osm": this.mapService.openstreetmapOsm,
      },
      // overlays: this.destination.getOverlays

      overlays: {
        "Route 1": this.destination.getPolylineRoute,
        'Route 2': this.destination2.getPolylineRoute,
        'Route 3': this.destination3.getPolylineRoute,
      }
    };

    this.options = {
      layers: [this.mapService.mainLayer],// on peut ajouter un marker ici , un groupe de marker, un polyline, etc.
      zoom: 7,
      minZoom: 1,
      maxZoom: 19,
      center: Leaflet.latLng(this.mapService.getMyCurrentPosition.latLong),
    };

  }


}
