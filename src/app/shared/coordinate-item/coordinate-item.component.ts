import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnDestroy, Output} from '@angular/core';
import {MapsService} from "@app/services/maps/maps.service";
import * as Leaflet from "leaflet";
import {Geometry} from "@app/models/geometry";
import {Station} from "@app/models/station";

@Component({
  selector: 'app-coordinate-item',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coordinate-item.component.html',
  styleUrl: './coordinate-item.component.css'
})
export class CoordinateItemComponent implements OnDestroy{
  @Input() data: any;

  protected readonly mapService: any = inject(MapsService);
  currentLayer: any = undefined;

  onShowCoordinate(coordinate: Station) {
    if (this.currentLayer != undefined) {
      this.mapService.map.removeLayer(this.currentLayer);
      this.currentLayer = undefined;
      return;
    }

    this.currentLayer = Leaflet.marker([coordinate.longitude, coordinate.latitude], {
      icon: this.mapService.myIcon
    });

    this.mapService.map.addLayer(this.currentLayer);

  }
  ngOnDestroy() {
    if (this.currentLayer != undefined) {
      this.mapService.map.removeLayer(this.currentLayer);
      this.currentLayer = undefined;
    }
  }
}
