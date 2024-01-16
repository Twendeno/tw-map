import {Component, DestroyRef, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransportLineService} from "@app/services/transport-line.service";
import {ComeBackComponent} from "@app/shared/come-back/come-back.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-transport-line',
  standalone: true,
  imports: [CommonModule, ComeBackComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './transport-line.component.html',
  styleUrl: './transport-line.component.css'
})
export class TransportLineComponent {
  private readonly transportLineService: TransportLineService = inject(TransportLineService);
  destroyRef = inject(DestroyRef);

  transportLines$ = this.transportLineService.getTransportLines();

  research: string = '';
}
