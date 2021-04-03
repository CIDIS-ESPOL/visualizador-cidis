import { HumedadComponent } from './Pages/humedad/humedad.component';
import { PrecipitacionComponent } from './Pages/precipitacion/precipitacion.component';
import { PhComponent } from './Pages/ph/ph.component';
import { TemperaturaComponent } from './Pages/temperatura/temperatura.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: "home", component: MainComponent,
    children:[
      {
        path: "", component: HomeComponent, outlet: "home"
      },
      {
        path: "temperatura", component: TemperaturaComponent, outlet: "home"
      },
      {
        path: "ph", component: PhComponent, outlet: "home"
      },
      {
        path: "precipitacion", component: PrecipitacionComponent, outlet: "home"
      },
      {
        path: "humedad", component: HumedadComponent, outlet: "home"
      }
        
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VisualizadorRoutingModule { }
