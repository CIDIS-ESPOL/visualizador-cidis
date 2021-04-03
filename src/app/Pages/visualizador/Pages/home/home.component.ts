import { SingletonService } from '../../../../Services/Data/singleton.service';
import { Keeper } from '../../../../Resources/Clases/keeper';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input()

  isCollapsed = true;

  keeper: Keeper = new Keeper();

  sensores: Array<string> = []

  nameTemperatura: string = "";
  namePH: string = ""
  namePrecipitacion: string = "";
  nameHumedad: string = "";

  srcTemperatura: string = ""
  srcPH:string = ""
  srcPrecipitacion: string = ""
  srcHumedad:string = ""

  urlSafeTemperatura!: SafeResourceUrl;
  urlSafePH!: SafeResourceUrl;
  urlSafePrecipitacion!: SafeResourceUrl;
  urlSafeHumedad!: SafeResourceUrl;

  constructor(
    private singleton: SingletonService,
    public sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.sensores = [ ...this.keeper.getSensorNames() ];

    this.nameTemperatura = this.namePH = this.namePrecipitacion = this.nameHumedad = "Sensor A";

    this.srcTemperatura = this.keeper.getEmbeddedUrl("Sensor A","temperatura","inicio")
    this.srcPH = this.keeper.getEmbeddedUrl("Sensor A","ph","inicio")
    this.srcPrecipitacion = this.keeper.getEmbeddedUrl("Sensor A","precipitacion","inicio")
    this.srcHumedad = this.keeper.getEmbeddedUrl("Sensor A","humedad","inicio")

    this.urlSafeTemperatura= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcTemperatura);
    this.urlSafePH= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPH);
    this.urlSafePrecipitacion= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPrecipitacion);
    this.urlSafeHumedad= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHumedad);
  }

  clickTemperatura(index: number){
    this.nameTemperatura = this.sensores[index]
    this.urlSafeTemperatura= this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl(this.nameTemperatura,"temperatura","inicio"));
    
  }

  clickPH(index: number){
    this.namePH = this.sensores[index]
    this.urlSafePH= this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl(this.namePH,"ph","inicio"));
    
  }

  clickPrecipitacion(index: number){
    this.namePrecipitacion = this.sensores[index]
    this.urlSafePrecipitacion= this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl(this.namePrecipitacion,"precipitacion","inicio"));
  }

  clickHumedad(index: number){
    this.nameHumedad = this.sensores[index]
    this.urlSafeHumedad = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl(this.nameHumedad,"humedad","inicio"));
  }

  toDetails(name:string){
    this.keeper.setSensor(name)
  }

}
