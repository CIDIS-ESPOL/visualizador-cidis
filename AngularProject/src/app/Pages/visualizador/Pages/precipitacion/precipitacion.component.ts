import { SingletonService } from '../../../../Services/Data/singleton.service';
import { Keeper } from '../../../../Resources/Clases/keeper';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-precipitacion',
  templateUrl: './precipitacion.component.html',
  styleUrls: ['./precipitacion.component.scss']
})
export class PrecipitacionComponent implements OnInit {

  @Input()

  keeper: Keeper = new Keeper();

  sensor: string = ""

  srcInicio:string = "";
  srcHistorico:string = "";

  urlSafeInicio!: SafeResourceUrl;
  urlSafeHistorico!: SafeResourceUrl;

  constructor(
    private singleton: SingletonService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.sensor = this.keeper.getSensor()

    this.srcInicio = this.keeper.getEmbeddedUrl(this.sensor,"precipitacion","inicio")
    this.srcHistorico = this.keeper.getEmbeddedUrl(this.sensor,"precipitacion","historico")

    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcInicio);
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHistorico);
  }


}
