import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ItemMenuCardComponent} from "@app/shared/item-menu-card/item-menu-card.component";
import {ActivatedRoute, Data, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "@app/services/language/language.service";
import {TranslationModule} from "@app/modules/translation/translation.module";
import {ReplaySubject, takeUntil} from "rxjs";
import {GeojsonData} from "@app/models/geojson-data";
import {MapsService} from "@app/services/maps/maps.service";
import {ClusterMapService} from "@app/services/cluster-map/cluster-map.service";
import {SkeletonModule} from "primeng/skeleton";
import {SkeletonSquareComponent} from "@app/shared/skeleton-square/skeleton-square.component";


@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, ItemMenuCardComponent, RouterLink, RouterLinkActive, NgOptimizedImage, RouterOutlet, TranslationModule, SkeletonModule, SkeletonSquareComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit, OnDestroy, AfterViewInit {

  private readonly route = inject(ActivatedRoute);
  protected readonly dataFromResolver = this.route.data;
  protected readonly mapService: MapsService = inject(MapsService);
  protected readonly clusterMapService: ClusterMapService = inject(ClusterMapService);

  protected readonly menuList = [
    {
      icon: 'assets/icons/itineraire.svg',
      title: 'menuList.cardItem.title.one',
      description: 'menuList.cardItem.description.one',
      route: '/itineraires'
    },
    {
      icon: 'assets/icons/time.svg',
      title: 'menuList.cardItem.title.two',
      description: 'menuList.cardItem.description.two',
      route: '/lines'
    },
    {
      icon: 'assets/icons/search.svg',
      title: 'menuList.cardItem.title.three',
      description: "menuList.cardItem.description.three",
      route: '/recherche'
    },
  ];

  protected readonly sousMenuList = [
    {icon: 'assets/icons/ticket.svg', title: 'menuList.title.one', route: '/points-de-vente'},
    {icon: 'assets/icons/agences.svg', title: 'menuList.title.two', route: '/agences'},
  ];

  protected readonly languageService$ = inject(LanguageService)
  private readonly translate$ = inject(TranslateService);
  private readonly destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  private readonly router = inject(Router)

  ngOnInit(): void {
    this.languageService$.getLanguage()
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (newLanguage: string) => {
          this.translate$.use(newLanguage); // Langue initiale
        }
      })
  }

  ngAfterViewInit(): void {
    this.dataFromResolver.pipe(takeUntil(this.destroy)).subscribe((data:Data) => {

      data['transportLines'].features.map((feature:any) => {
        this.mapService.addGeoJSONLayer(feature, feature.properties.color, false, 5);
      });

      data['stations'].features.map((feature:GeojsonData) => {
        this.clusterMapService.addMarkerClusterWithGeoJson(feature)
      });


      data['departures'].features.map((feature:GeojsonData) => {
        this.clusterMapService.addMarkerClusterWithGeoJson(feature, 'departure')
      });

      data['arrivals'].features.map((feature:GeojsonData) => {
        this.clusterMapService.addMarkerClusterWithGeoJson(feature, 'arrival')
      });

    });
  }

  goToAnotherComponent(menuItem: any): void {
    this.router.navigate([menuItem.route]).then();
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}
