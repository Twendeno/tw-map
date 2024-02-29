import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuListComponent} from "@app/modules/menu/menu-list/menu-list.component";

const routes: Routes = [
  {path: '', component: MenuListComponent, title: 'Home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule {
}
