import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TransportLineComponent} from "@app/modules/line/transport-line/transport-line.component";
import {MapsComponent} from "@app/modules/maps/maps.component";

@Component({
  selector: 'app-full-map',
  standalone: true,
  imports: [CommonModule, MapsComponent, TransportLineComponent, NgOptimizedImage],
  templateUrl: './full-map.component.html',
  styleUrl: './full-map.component.css'
})
export class FullMapComponent {

}
