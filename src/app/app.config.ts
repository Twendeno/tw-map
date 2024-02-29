import { ApplicationConfig } from '@angular/core';
import {PreloadAllModules, provideRouter, withHashLocation, withPreloading} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch())
  ]// providers: [provideRouter(routes,withHashLocation()), provideClientHydration()]
};
