import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {GeojsonApiService} from "@app/services/geojson-api/geojson-api.service";
import {GeojsonData} from "@app/models/geojson-data";

export const mapsDepartureResolver: ResolveFn<GeojsonData> = (route, state) => {
  return inject(GeojsonApiService).allTransportStation('departure');
};