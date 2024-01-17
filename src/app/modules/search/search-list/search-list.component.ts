import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComeBackComponent} from "@app/shared/come-back/come-back.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, ComeBackComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent {
  research:string=""
}
