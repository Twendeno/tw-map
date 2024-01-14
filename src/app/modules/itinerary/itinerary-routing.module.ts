import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ItineraryListComponent} from "@app/modules/itinerary/itinerary-list/itinerary-list.component";

const routes: Routes = [
  { path: '',component:ItineraryListComponent,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItineraryRoutingModule { }
