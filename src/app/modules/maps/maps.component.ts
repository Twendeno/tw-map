import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import 'leaflet';
import 'leaflet.markercluster';
import "leaflet-routing-machine";
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";
import {TransportLineComponent} from "@app/modules/line/transport-line/transport-line.component";
import {MapsService} from "@app/services/maps.service";
import {RouterOutlet} from "@angular/router";
import {ItineraryRoutingService} from "@app/services/itinerary-routing.service";
import {ClusterMapService} from "@app/services/cluster-map.service";

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, LeafletModule, TransportLineComponent, LeafletMarkerClusterModule, RouterOutlet],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit,AfterViewInit {

  readonly mapService: MapsService = inject(MapsService);
  readonly itineraryRoutingService: ItineraryRoutingService = inject(ItineraryRoutingService);
  readonly clusterMapService: ClusterMapService = inject(ClusterMapService);

  constructor(
    private changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
    //this.itineraryRoutingService.drawRouting()
  }

  ngOnInit(): void {
  }

}
