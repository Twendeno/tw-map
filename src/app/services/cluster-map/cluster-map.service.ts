import {Injectable} from '@angular/core';
import 'leaflet';
import 'leaflet.markercluster';
import * as Leaflet from "leaflet";
import {icon} from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class ClusterMapService {

  markerClusterData: any[] = [];

  markerClusterOptions: Leaflet.MarkerClusterGroupOptions = {
    animate: true,
    disableClusteringAtZoom: 15,
    maxClusterRadius: 80,
    spiderfyOnMaxZoom: false,
  };

  markerClusterGroup!: Leaflet.MarkerClusterGroup;

  myIcon = Leaflet.icon({
    iconSize: [25, 41],
    iconAnchor: [13, 41],
    iconUrl: 'assets/marker-icon.png',
    iconRetinaUrl: 'assets/marker-icon-2x.png',
    shadowUrl: 'assets/marker-shadow.png'
  })

  constructor() {
  }

  markerClusterReady($event: Leaflet.MarkerClusterGroup) {
    this.markerClusterGroup = $event;
  }

  addMarkerCluster(data: any[], icon: Leaflet.Icon = this.myIcon) {
    data.map((item: any) => {
      const markerText: string = `<br><span>Name: <span class="text-blue-900">item </b></span></span>`;
      const marker = Leaflet.marker([item[1], item[0]], {icon}).bindPopup(markerText)
      this.markerClusterData.push(marker);
    });
  }

  addMarkerClusterWithGeoJson(data: any, kindOfStation: string = 'stop') {
    let color = '#fff';
    switch (kindOfStation) {
      case 'stop':
        color = '#fff';
        break;
      case 'departure':
        color = '#6bf642';
        break;
      case 'arrival':
        color = '#f81c1c';
        break;
        default:
          color = '#fff';
    }

    const stations = Leaflet.geoJSON(data, {
      pointToLayer: (feature, latlng) => {

        return Leaflet.circleMarker(latlng, {
          radius: 5,
          fillColor: color,
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 1,
        }).bindTooltip(feature.properties.name);

        /*return Leaflet.marker(latlng, {icon: this.myIcon})*/

        /*return Leaflet.marker(latlng, {
            icon: Leaflet.divIcon({
              className: 'h-8 w-8 rounded-full border-white border text-white text-center text-xs flex flex-col justify-center items-center',
              html: "<div class='bg-red-400 w-full h-full rounded-full flex justify-center items-center text-xs'><small>Tw</small></div>",
              iconSize: [30, 42],
              iconAnchor: [15, 42]
            })
          }
        ).bindTooltip(feature.properties.name)*/

      },
      onEachFeature: (feature, layer) => {

        const markerText: string = `
<div class="relative flex flex-col bg-white text-gray-700 ">
  <div class="relative mx-2 h-20 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
    <img
      src="https://picsum.photos/200/300"
      class="h-full w-full object-cover"
     alt="${feature.properties.name}"/>
  </div>
  <div class="px-6">
    <div class="mb-2 flex items-center justify-between">
      <p class="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
        ${feature.properties.name}
      </p>
    </div>
    <small class="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75">
      With plenty of talk and listen time, voice-activated Siri access, and an
      available wireless charging case.
    </small>
  </div>
</div>
`;
        layer.bindPopup(markerText);
      },


    })
    stations.addTo(this.markerClusterGroup)
  }

}
