import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Station} from "@app/models/station";
import {Root} from "@app/models/root";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.MS_RX_API.URL}${environment.MS_RX_API.VERSION}/`+ 'coordinates';

  allCoordinates():Observable<Root<Station[]>> {
    return this.http.get<Root<Station[]>>(this.url);
  }

}
