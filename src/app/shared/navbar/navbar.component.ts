import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslationModule} from "@app/modules/translation/translation.module";
import {LanguageService} from "@app/services/language.service";
import {TreeSelectModule} from "primeng/treeselect";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,NgOptimizedImage, TranslateModule, TranslationModule, TreeSelectModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit , OnDestroy{


  private readonly translate$= inject(TranslateService);
  readonly languageService$ = inject(LanguageService)


  ngOnInit(): void {
    this.languageService$.getLanguage().subscribe({
      next:(newLanguage: string)=>{
        this.translate$.setDefaultLang(newLanguage); // Langue par défaut
        this.translate$.use(newLanguage); // Langue initiale
      },
      complete:()=>{
        this.languageService$.getLanguage().unsubscribe()
      }
    })
  }

  ngOnDestroy(): void {
    this.languageService$.getLanguage().unsubscribe()
  }

  public selectLanguage(event: any) {
    this.translate$.use(event.target.value);
    this.languageService$.setLanguage(event.target.value)
  }

}
