import {ChangeDetectionStrategy, Component, inject, Input, OnDestroy} from '@angular/core';
import {MapsService} from "@app/services/maps/maps.service";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-line-item',
  standalone: true,
  imports: [
    NgStyle
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './line-item.component.html',
  styleUrl: './line-item.component.css'
})
export class LineItemComponent implements OnDestroy{

  @Input() data: any;
  protected readonly mapService: any = inject(MapsService);
  layers: any[] = [];
  onLineClicked(geometry: any) {

    const layerExist=this.layers.find(layer => layer.name = geometry.name)

    if (layerExist){
      this.onDeleteLayer(geometry.name);
      return;
    }

    if(layerExist==undefined){

      const layer = this.mapService.addGeoJSONLayer(
        JSON.parse(geometry.geodata),
        geometry.color,
        false,
        6
      );

      this.layers.push({name: geometry.name, layer: layer,isShow:true});
      return;
    }

  }

  onDeleteLayer(name: string) {
    this.layers = this.layers.filter(layer =>{
      if (layer.isShow){
        this.mapService.map.removeLayer(layer.layer);
      }
      return layer.name !== name;
    });
  }

  ngOnDestroy() {
    this.layers.forEach(layer => {
      this.mapService.map.removeLayer(layer.layer);
    });
  }
}
