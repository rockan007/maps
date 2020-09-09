import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsMapComponent } from './charts-map/charts-map.component';

const routes: Routes = [{ path: '', component: ChartsMapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsMapRoutingModule { }
