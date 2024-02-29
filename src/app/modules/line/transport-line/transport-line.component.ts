import {ChangeDetectionStrategy, Component, inject, OnDestroy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComeBackComponent} from "@app/shared/come-back/come-back.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilterPipe} from "@app/utils/filter/filter.pipe";
import {Router} from "@angular/router";
import {SearchCrudService} from "@app/services/search/search-crud.service";
import {ReplaySubject, takeUntil} from "rxjs";
import {SearchFormComponent} from "@app/shared/search-form/search-form.component";
import {LineItemComponent} from "@app/shared/line-item/line-item.component";
import {LoadingComponent} from "@app/shared/loading/loading.component";

@Component({
  selector: 'app-transport-line',
  standalone: true,
  imports: [CommonModule, ComeBackComponent, FormsModule, ReactiveFormsModule, FilterPipe, SearchFormComponent, LineItemComponent, LoadingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transport-line.component.html',
  styleUrl: './transport-line.component.css'
})
export class TransportLineComponent implements OnDestroy{
  private readonly destroy: ReplaySubject<any> = new ReplaySubject<any>(1);
  private readonly router = inject(Router);
  private readonly searchCrudService = inject(SearchCrudService);

  transportLines$ = this.searchCrudService.documentSearch('geometries');
  isResearch = false;
  searchResult = signal<any[]>([]);

  onGoBack(event: boolean) {
    this.router.navigate(['/']);
  }


  onSubmit(searchValue: string) {
    this.isResearch = true;

    this.searchCrudService.multiSearch(searchValue)
      .pipe(takeUntil(this.destroy))
      .subscribe((data)=>{

      const coordinates = data.results.find((result: any) => result.indexUid === 'coordinates');

      const geometries = coordinates.hits.find((hit: any) => {
        return hit.name.toString().trim().toLowerCase() === searchValue
      }).geometry;

      this.searchResult.set([]);

      geometries.forEach((geometry: any) => {

        this.searchCrudService.search('geometries', geometry.geometry_uuid)
          .pipe(takeUntil(this.destroy))
          .subscribe((data: any) => {
          const geometries = data.hits
          this.searchResult.set(this.searchResult().concat(geometries));
        })

      });

    })
  }

  ngOnDestroy() {
    this.destroy.next(null);
    this.destroy.complete();
  }
}
