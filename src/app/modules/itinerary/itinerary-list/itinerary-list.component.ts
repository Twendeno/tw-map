import {ChangeDetectionStrategy, Component, inject, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComeBackComponent} from "@app/shared/come-back/come-back.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ItineraryRoutingService} from "@app/services/itinerary-routing/itinerary-routing.service";
import {AutoCompleteModule} from "primeng/autocomplete";
import {MapsService} from "@app/services/maps/maps.service";
import {Router} from "@angular/router";
import {ItineraryFormComponent} from "@app/shared/itinerary-form/itinerary-form.component";

@Component({
  selector: 'app-itinerary-list',
  standalone: true,
  imports: [CommonModule, ComeBackComponent, ReactiveFormsModule, AutoCompleteModule, FormsModule, ItineraryFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css'
})
export class ItineraryListComponent implements OnDestroy {

  protected readonly itineraryRoutingService: ItineraryRoutingService = inject(ItineraryRoutingService);
  protected readonly mapService = inject(MapsService);
  private readonly router = inject(Router);

  currentItinerary: any | undefined = undefined

  onSubmit(formValue: any): void {
    this.onRemoveLastItinerary();
    this.currentItinerary = this.itineraryRoutingService.drawRouting(formValue.departure, formValue.arrival)
  }

  onRemoveLastItinerary() {
    if (this.currentItinerary !== undefined) {
      this.mapService.map.removeControl(this.currentItinerary);
    }
  }

  onGoBack(event: boolean) {
    this.onRemoveLastItinerary();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.onRemoveLastItinerary();
  }
}
