import {inject, Injectable} from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import * as Leaflet from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class ClusterMapService {

  markerClusterData:any[] = [];

  markerClusterOptions: Leaflet.MarkerClusterGroupOptions = {
    animate: true,
    disableClusteringAtZoom: 15,
    maxClusterRadius: 80,
    spiderfyOnMaxZoom: false,
  };

  markerClusterGroup!: Leaflet.MarkerClusterGroup ;
  constructor() { }

  markerClusterReady($event: Leaflet.MarkerClusterGroup) {
    this.markerClusterGroup = $event;
  }

  addMarkerCluster(data:any[], icon: Leaflet.Icon) {
    data.map((item: any) => {
      const markerText: string = `<br><span>Name: <span class="text-blue-900">item </b></span></span>`;
      const marker= Leaflet.marker([item[1], item[0]], {icon}).bindPopup(markerText)
      this.markerClusterData.push(marker);
    });
  }

}
