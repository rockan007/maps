import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'charts-map', loadChildren: () =>  import('./charts-map/charts-map.module').then(m => m.ChartsMapModule) },
  { path: "sky-map", loadChildren: () => import('./sky-map/sky-map.module').then(m => m.SkyMapModule)},
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
