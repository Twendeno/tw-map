import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-direction-item',
  standalone: true,
  imports: [],
  templateUrl: './direction-item.component.html',
  styleUrl: './direction-item.component.css'
})
export class DirectionItemComponent {
  @Input() data: any;
}
