import {inject, Injectable} from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';
import {MapsService} from "@app/services/maps/maps.service";

@Injectable({
  providedIn: 'root'
})
export class ItineraryRoutingService {

  private readonly mapService: MapsService = inject(MapsService);

  constructor() {
  }

  // Routing
  drawRouting(departure: any, arrival: any) {
    let startCoords: any = [departure.split(',')[1], departure.split(',')[0]];
    let endCoords: any = [arrival.split(',')[1], arrival.split(',')[0]];

    return Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(startCoords),
        Leaflet.latLng(endCoords)
      ],
      routeWhileDragging: false,
      autoRoute: true,
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: true,
      plan: Leaflet.Routing.plan([Leaflet.latLng(startCoords), Leaflet.latLng(endCoords)], {
        language: 'fr',
        addWaypoints: true, // Désactiver l'ajout automatique de points de passage
        createMarker: function (i, wp, nWps) {

          const departureIcon = Leaflet.divIcon({
            className: 'h-8 w-8 rounded-full border-white border text-white text-center text-xs flex flex-col justify-center items-center',
            html: "<div class='bg-green-400 w-full h-full rounded-full flex justify-center items-center text-xs'><small>A</small></div>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
          })

          const arrivalIcon = Leaflet.divIcon({
            className: 'h-8 w-8 rounded-full border-white border text-white text-center text-xs flex flex-col justify-center items-center',
            html: "<div class='bg-red-400 w-full h-full rounded-full flex justify-center items-center text-xs'><small>B</small></div>",
            iconSize: [30, 42],
            iconAnchor: [15, 42]
          })
          const icon = i === 0 ? departureIcon : arrivalIcon;

          return Leaflet.marker(wp.latLng, {
            draggable: false,
            icon
          });
        } // Désactiver l'ajout automatique de marqueurs
      }),
      router: Leaflet.Routing.osrmv1({
        serviceUrl: 'http://127.0.0.1:5000/route/v1',
        profile: 'foot',
        language: 'fr',
        useHints: true,
      }),
    }).addTo(this.mapService.map);

  }

}
