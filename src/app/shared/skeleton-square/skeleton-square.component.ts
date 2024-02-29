import {Component, Input} from '@angular/core';
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-skeleton-square',
  standalone: true,
  imports: [
    SkeletonModule
  ],
  templateUrl: './skeleton-square.component.html',
  styleUrl: './skeleton-square.component.css'
})
export class SkeletonSquareComponent {
  @Input() width: string = "445px";
  @Input() height: string = "4rem";
}
