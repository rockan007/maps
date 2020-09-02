import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//天地图模块
import { SkyMapModule } from "../app/sky-map/sky-map.module"
//chart-map模块
import { ChartsMapModule } from "../app/charts-map/charts-map.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    SkyMapModule,
    ChartsMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
