import {Component, EventEmitter, inject, OnDestroy, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {StationService} from "@app/services/station/station.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-itinerary-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './itinerary-form.component.html',
  styleUrl: './itinerary-form.component.css'
})
export class ItineraryFormComponent implements OnDestroy{

  @Output() onFormSubmitted = new EventEmitter<any>();
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  protected readonly stationService = inject(StationService);

  station$ = this.stationService.allCoordinates()

  itineraryForm = this.formBuilder.group({
    departure: [''],
    arrival: [''],
  });

  onSubmit(): void {
    if (this.itineraryForm.invalid) {
      return;
    }

    const formValue = {
      departure: this.itineraryForm.value.departure!,
      arrival: this.itineraryForm.value.arrival!
    };

    this.onFormSubmitted.emit(formValue);
  }

  get departure() {
    return this.itineraryForm.get('departure')!;
  }

  get arrival() {
    return this.itineraryForm.get('arrival')!;
  }

  ngOnDestroy() {
    this.itineraryForm.reset()
  }

}
