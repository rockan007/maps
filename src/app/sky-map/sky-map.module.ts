import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { MapShowerComponent } from './map-shower/map-shower.component';
import { SkyMapComponent } from './sky-map/sky-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from "@angular/material/button";
import {SkyMapRoutingModule} from './sky-map-routing.module';


@NgModule({
  declarations: [MapSelectorComponent, MapShowerComponent, SkyMapComponent],
  imports: [
    CommonModule,
    SkyMapRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ]
})
export class SkyMapModule { }
