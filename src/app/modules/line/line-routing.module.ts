import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransportLineComponent} from "@app/modules/line/transport-line/transport-line.component";

const routes: Routes = [
  {path:'', component: TransportLineComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineRoutingModule { }
