import {Routes} from '@angular/router';
import {MapsComponent} from "@app/modules/maps/maps.component";
import {mapsLineResolver} from "@app/resolvers/maps/maps-line.resolver";
import {mapsStationResolver} from "@app/resolvers/maps/maps-station.resolver";
import {mapsDepartureResolver} from "@app/resolvers/maps/maps-departure.resolver";
import {mapsArrivalResolver} from "@app/resolvers/maps/maps-arrival.resolver";

export const routes: Routes = [
  {
    path: '', component: MapsComponent,
    children: [
      {
        path: '', resolve: {
          transportLines: mapsLineResolver,
          stations: mapsStationResolver,
          departures: mapsDepartureResolver,
          arrivals: mapsArrivalResolver
        },
        loadChildren: () => import('@app/modules/menu/menu.module').then(m => m.MenuModule)
      },
      {path: 'lines', loadChildren: () => import('@app/modules/line/line.module').then(m => m.LineModule)},
      {path: 'recherche', loadChildren: () => import('@app/modules/search/search.module').then(m => m.SearchModule)},
      {
        path: 'itineraires',
        loadChildren: () => import('@app/modules/itinerary/itinerary.module').then(m => m.ItineraryModule)
      },
    ],
  },
  {path: '', pathMatch: 'full', redirectTo: ''},
  {path: '**', component: MapsComponent}
];
