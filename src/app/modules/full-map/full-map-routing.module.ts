import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FullMapComponent} from "@app/modules/full-map/full-map.component";

const routes: Routes = [
  { path:'', component: FullMapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullMapRoutingModule { }
