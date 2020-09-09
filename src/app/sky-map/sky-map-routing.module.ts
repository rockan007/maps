import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkyMapComponent } from './sky-map/sky-map.component';

const routes: Routes = [{ path: '', component: SkyMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkyMapRoutingModule { }
