import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import 'leaflet';
import 'leaflet.markercluster';
import "leaflet-routing-machine";
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";
import {TransportLineComponent} from "@app/modules/line/transport-line/transport-line.component";
import {MapsService} from "@app/services/maps/maps.service";
import {RouterOutlet} from "@angular/router";
import {ClusterMapService} from "@app/services/cluster-map/cluster-map.service";
import {ReplaySubject} from "rxjs";
import {LoadingComponent} from "@app/shared/loading/loading.component";
import {SkeletonSquareComponent} from "@app/shared/skeleton-square/skeleton-square.component";

@Component({
  selector: 'app-maps',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LeafletModule, TransportLineComponent, LeafletMarkerClusterModule, RouterOutlet, LoadingComponent, NgOptimizedImage, SkeletonSquareComponent],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements AfterViewInit, OnDestroy {

  protected readonly mapService: MapsService = inject(MapsService);
  protected readonly clusterMapService: ClusterMapService = inject(ClusterMapService);

  private readonly destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  private readonly changeDetector = inject(ChangeDetectorRef);

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }


  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
