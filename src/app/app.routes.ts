import {Routes} from '@angular/router';
import {MapsComponent} from "@app/modules/maps/maps.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: ''},
  {
    path: '', component: MapsComponent,
    children: [
      {path: '', loadChildren: () => import('@app/modules/menu/menu.module').then(m => m.MenuModule)},
      {path: 'lines', loadChildren: () => import('@app/modules/line/line.module').then(m => m.LineModule)},
      {path: 'recherche', loadChildren: () => import('@app/modules/search/search.module').then(m => m.SearchModule)},
      {path: 'itineraires', loadChildren: () => import('@app/modules/itinerary/itinerary.module').then(m => m.ItineraryModule)},
    ],
  },
  {path: '**', redirectTo: ''}
];
