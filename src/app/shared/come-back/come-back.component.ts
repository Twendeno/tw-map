import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-come-back',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './come-back.component.html',
  styleUrl: './come-back.component.css'
})
export class ComeBackComponent {

}
