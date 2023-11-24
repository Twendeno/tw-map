import { Routes } from '@angular/router';

export const routes: Routes = [
    { path:'', pathMatch:'full', redirectTo: '/maps'},
    { path: 'maps', loadChildren:()=> import('@app/maps/maps.module').then(m => m.MapsModule) },
    { path: '**', redirectTo: '/maps'}
];
