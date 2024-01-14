import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ItemMenuCardComponent} from "@app/components/item-menu-card/item-menu-card.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, ItemMenuCardComponent, RouterLink, RouterLinkActive, NgOptimizedImage, RouterOutlet],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent {

  menuList = [
    {icon: 'assets/icons/itineraire.svg', title: 'Itinéraires', description: 'Je calcule mon itineraire en transport en commun.', route: '/itineraires'},
    {icon: 'assets/icons/time.svg', title: 'Horaires des lignes', description: 'Je consulte les horaires de passage.', route: '/lines'},
    {icon: 'assets/icons/search.svg', title: 'Rechercher', description: 'Je recherche un arrêt, une ligne, un lieu d\'intérêt ou une commune.', route: '/recherche'},
  ];

  sousMenuList = [
    {icon:'assets/icons/ticket.svg',title:'Points de vente',route:'/points-de-vente'},
    {icon:'assets/icons/agences.svg',title:'Nos agences',route:'/agences'},
  ];

}
