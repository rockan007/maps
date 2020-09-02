import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { MapShowerComponent } from './map-shower/map-shower.component';



@NgModule({
  declarations: [MapSelectorComponent, MapShowerComponent],
  imports: [
    CommonModule
  ]
})
export class SkyMapModule { }
