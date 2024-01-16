import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComeBackComponent} from "@app/shared/come-back/come-back.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-itinerary-list',
  standalone: true,
  imports: [CommonModule, ComeBackComponent, ReactiveFormsModule],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css'
})
export class ItineraryListComponent {

  itineraryForm = this.formBuilder.group({
    departure: [''],
    arrival: [''],
  });
  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit(): void {
    console.log(this.itineraryForm.value)
  }
}
