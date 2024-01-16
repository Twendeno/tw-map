import {inject, Injectable} from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet-routing-machine';
import {MapsService} from "@app/services/maps.service";

@Injectable({
  providedIn: 'root'
})
export class ItineraryRoutingService {

  private readonly mapService: MapsService = inject(MapsService);
  constructor() { }

  // Routing
  drawRouting() {
    Leaflet.Routing.control({
      waypoints: [
        Leaflet.latLng(-4.801103737146387, 11.839857614078458),
        Leaflet.latLng(-4.776542068129604, 11.86583438291675)
      ],
      routeWhileDragging: true,
      autoRoute: true,
      showAlternatives: true,
      fitSelectedRoutes: false,
      show: false
    }).addTo(this.mapService.map);
  }
}
