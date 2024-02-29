import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GeojsonData} from "@app/models/geojson-data";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class GeojsonApiService {

  private readonly http = inject(HttpClient);
  private readonly url: string = `${environment.MS_RX_API.URL}${environment.MS_RX_API.VERSION}/` + 'coordinate-geojson';

  /*lines(uuidOrRefOrName:string,type:string='LineString',isStop:boolean=false,isFeature:string=''): Observable<any> {
    return this.http.get<any>(this.url+'/geo/'+uuidOrRefOrName+'?type='+type+'&isStop='+isStop+'&isFeature='+isFeature);
  }*/

  allTransportStation(kindOfStation: string = "stop"): Observable<GeojsonData> {
    return this.http.get<GeojsonData>(`${this.url}/cluster-station?kindOfStation=${kindOfStation}`);
  }

  allTransportLines(): Observable<GeojsonData> {
    return this.http.get<GeojsonData>(`${this.url}`);
  }
}
