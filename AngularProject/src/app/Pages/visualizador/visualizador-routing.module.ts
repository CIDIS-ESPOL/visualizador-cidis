import { PrecipitacionComponent } from './Pages/precipitacion/precipitacion.component';
import { UvComponent } from './Pages/uv/uv.component';
import { PresionComponent } from './Pages/presion/presion.component';
import { HumedadComponent } from './Pages/humedad/humedad.component';
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
        path: "temperatura/:cultivo/:finca", component: TemperaturaComponent, outlet: "home"
      },
      {
        path: "precipitacion/:cultivo/:finca", component: PrecipitacionComponent, outlet: "home"
      },
      {
        path: "uv/:cultivo/:finca", component: UvComponent, outlet: "home"
      },
      {
        path: "humedad/:cultivo/:finca", component: HumedadComponent, outlet: "home"
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
