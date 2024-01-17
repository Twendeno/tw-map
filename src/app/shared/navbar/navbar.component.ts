import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslationModule} from "@app/modules/translation/translation.module";
import {LanguageService} from "@app/services/language.service";
import {TreeSelectModule} from "primeng/treeselect";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule, TranslationModule, TreeSelectModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {


  private readonly translate$ = inject(TranslateService);
  readonly languageService$ = inject(LanguageService)
  private subscription = new Subscription();


  ngOnInit(): void {
    this.subscription.add(
      this.languageService$.getLanguage().subscribe({
        next: (newLanguage: string) => {
          this.translate$.setDefaultLang(newLanguage); // Langue par défaut
          this.translate$.use(newLanguage); // Langue initiale
        }
      }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  public selectLanguage(event: any) {
    this.translate$.use(event.target.value);
    this.languageService$.setLanguage(event.target.value)
  }

}
