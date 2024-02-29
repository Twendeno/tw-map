import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComeBackComponent} from "@app/shared/come-back/come-back.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {SearchFormComponent} from "@app/shared/search-form/search-form.component";
import {Observable} from "rxjs";
import {SearchCrudService} from "@app/services/search/search-crud.service";
import {LineItemComponent} from "@app/shared/line-item/line-item.component";
import {DirectionItemComponent} from "@app/shared/direction-item/direction-item.component";
import {CoordinateItemComponent} from "@app/shared/coordinate-item/coordinate-item.component";
import {NotFoundItemComponent} from "@app/shared/not-found-item/not-found-item.component";
import {LoadingComponent} from "@app/shared/loading/loading.component";

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, ComeBackComponent, ReactiveFormsModule, FormsModule, SearchFormComponent, LineItemComponent, DirectionItemComponent, CoordinateItemComponent, NotFoundItemComponent, LoadingComponent],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent {
  private readonly router = inject(Router);
  private readonly searchCrudService = inject(SearchCrudService);

  protected searchResult$ : Observable<any> = new Observable<any>();

  onSubmit(searchValue: string) {
    this.searchResult$ = this.searchCrudService.multiSearch(searchValue)
  }

  onGoBack(event: boolean) {
    this.router.navigate(['/'])
  }
}
