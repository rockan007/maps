import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from "ngx-echarts"
import { AreaSelectorComponent } from './area-selector/area-selector.component';
import { MapShowerComponent } from './map-shower/map-shower.component';
import { ChartsMapComponent } from './charts-map/charts-map.component';

import { AreaSelectorService } from "./services/area-selector.service";
import { ChartsMapService } from "./services/charts-map.service";
import { DatGuiService } from "./dat-gui.service"
import { MapStyleSelectorService } from "./services/map-style-selector.service";
import {
  ChartsMapRoutingModule
} from "./charts-map-routing.module";
@NgModule({
  declarations: [AreaSelectorComponent, MapShowerComponent, ChartsMapComponent],
  imports: [
    CommonModule,
    ChartsMapRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [AreaSelectorService, ChartsMapService, MapStyleSelectorService, DatGuiService]
})
export class ChartsMapModule { }
