import {Injectable, signal} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private language = new BehaviorSubject<string>('fr');
  test : string = ""
  languages = [
    {
      codeName: 'fr',
      fullName: "Francais",
      flagName: 'FR'
    },
    {
      codeName: 'en',
      fullName: "Anglais",
      flagName: 'GB'
    },
    {
      codeName: 'cg',
      fullName: "Congolais",
      flagName: 'GB'
    }
  ]

  defaultNavLang = navigator.language.toString()
  languageCode = this.defaultNavLang.split('-')[0]

  constructor() {
    this.language.next(this.languageCode)
  }

  getLanguage() {
    return this.language
  }

  setLanguage(language: string): void {
    this.language.next(language)
  }

}
