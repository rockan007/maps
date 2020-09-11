import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapSelectorComponent } from './map-selector/map-selector.component';
import { MapShowerComponent } from './map-shower/map-shower.component';
import { SkyMapComponent } from './sky-map/sky-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from "@angular/material/button";
import { SkyMapRoutingModule } from './sky-map-routing.module';
import { SkyMapService } from './sky-map.service';
import { SkyMapDirective } from './sky-map.directive'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MapSelectorComponent, MapShowerComponent, SkyMapComponent, SkyMapDirective],
  imports: [
    CommonModule,
    SkyMapRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule, 
    HttpClientModule

  ],
  providers: [SkyMapService],
  exports: [SkyMapDirective]
})
export class SkyMapModule { }
