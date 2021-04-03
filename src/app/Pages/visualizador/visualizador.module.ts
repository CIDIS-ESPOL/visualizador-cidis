import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule,NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

import { VisualizadorRoutingModule } from './visualizador-routing.module';
import { LeftMenuComponent } from './fijos/left-menu/left-menu.component';
import { HeaderComponent } from './fijos/header/header.component';
import { HomeComponent } from './Pages/home/home.component';
import { MainComponent } from './main/main.component';
import { TemperaturaComponent } from './Pages/temperatura/temperatura.component';
import { PhComponent } from './Pages/ph/ph.component';
import { PrecipitacionComponent } from './Pages/precipitacion/precipitacion.component';
import { HumedadComponent } from './Pages/humedad/humedad.component';


@NgModule({
  declarations: [LeftMenuComponent, HeaderComponent, HomeComponent, MainComponent, TemperaturaComponent, PhComponent, PrecipitacionComponent, HumedadComponent],
  imports: [
    CommonModule,
    VisualizadorRoutingModule,
    NgbAccordionModule,
    NgbCollapseModule,
    
  ]
})
export class VisualizadorModule { }
