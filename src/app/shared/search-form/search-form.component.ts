import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-form',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly searchForm = this.fb.group({
    search: ['', [Validators.required]]
  });

  @Output() onFormSubmitted = new EventEmitter<string>();
  @Input() placeholder = 'Search...';

  onSubmit() {
    if (this.searchForm.invalid) {
      return;
    }
    const search = this.searchForm.value.search!.trim().toLowerCase();
    this.onFormSubmitted.emit(search);
  }

  get search() {
    return this.searchForm.get('search');
  }


}
