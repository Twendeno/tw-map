import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "@app/shared/navbar/navbar.component";
import {MapsComponent} from "@app/modules/maps/maps.component";
import 'leaflet.markercluster';
import {LeafletMarkerClusterModule} from "@asymmetrik/ngx-leaflet-markercluster";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent,LeafletMarkerClusterModule, MapsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
