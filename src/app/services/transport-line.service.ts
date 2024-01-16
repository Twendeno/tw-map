import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Root} from "@app/models/root";
import {Geometry} from "@app/models/geometry";

@Injectable({
  providedIn: 'root'
})
export class TransportLineService {

  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = "http://localhost:3000/v1";

  getTransportLines(): Observable<Root<Geometry[]>> {
    const url:string = `${this.baseUrl}/geometries`;
    return this.http.get<Root<Geometry[]>>(url);
  }
}
