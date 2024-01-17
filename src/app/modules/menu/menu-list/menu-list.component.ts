import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ItemMenuCardComponent} from "@app/components/item-menu-card/item-menu-card.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "@app/services/language.service";
import {TranslationModule} from "@app/modules/translation/translation.module";


@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, ItemMenuCardComponent, RouterLink, RouterLinkActive, NgOptimizedImage, RouterOutlet, TranslationModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit , OnDestroy{

  menuList = [
    {icon: 'assets/icons/itineraire.svg', title: 'menuList.cardItem.title.one', description: 'menuList.cardItem.description.one', route: '/itineraires'},
    {icon: 'assets/icons/time.svg', title: 'menuList.cardItem.title.two', description: 'menuList.cardItem.description.two', route: '/lines'},
    {icon: 'assets/icons/search.svg', title: 'menuList.cardItem.title.three', description: "menuList.cardItem.description.three", route: '/recherche'},
  ];

  sousMenuList = [
    {icon:'assets/icons/ticket.svg',title:'menuList.title.one',route:'/points-de-vente'},
    {icon:'assets/icons/agences.svg',title:'menuList.title.two',route:'/agences'},
  ];


  readonly languageService$ = inject(LanguageService)
  private readonly translate$= inject(TranslateService);

  ngOnInit(): void {
    this.languageService$.getLanguage().subscribe({
      next:(newLanguage: string)=>{
        this.translate$.use(newLanguage); // Langue initiale
      },
      complete:()=>{
        this.languageService$.getLanguage().unsubscribe()
      }
    })
  }

  ngOnDestroy(): void {
    this.languageService$.getLanguage().unsubscribe()
  }
  
}
