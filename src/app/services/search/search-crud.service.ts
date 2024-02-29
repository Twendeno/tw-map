import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchCrudService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = `${environment.MS_RX_API.URL}${environment.MS_RX_API.VERSION}/`+ 'search';

  documentSearch(indexUID: string): Observable<any> {
    const url = `${this.url}/documents/${indexUID.trim()}`;
    return this.http.get(url);
  }

  search(indexUid:string, query: string): Observable<any> {
    const url = `${this.url}/query/${indexUid.trim()}?q=${query.trim()}`;
    return this.http.get(url);
  }
  multiSearch(query: string): Observable<any> {
    const url = `${this.url}?q=${query.trim()}`;
    return this.http.get(url);
  }
}
