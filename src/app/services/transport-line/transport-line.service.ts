import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Root} from "@app/models/root";
import {Geometry} from "@app/models/geometry";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class TransportLineService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly url: string = `${environment.MS_RX_API.URL}${environment.MS_RX_API.VERSION}/`+ 'geometries'

  getTransportLines(): Observable<Root<Geometry[]>> {
    return this.http.get<Root<Geometry[]>>(this.url);
  }
}
