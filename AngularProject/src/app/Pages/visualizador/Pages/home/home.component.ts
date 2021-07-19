import { HttpGrafana } from './../../../../Resources/Constantes/http-grafana';
import { CookieService } from './../../../../Services/Storage/cookie.service';
import { FincaService } from './../../../../Services/Data/finca.service';
import { CultivoService } from './../../../../Services/Data/cultivo.service';
import { PDFService } from './../../../../Services/Transform/pdf.service';

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

  cultivo: string = ""

  nameFinca: string = ""

  fincas: Array<string> = []
  
  medidas: Array<string> = ["temperatura","precipitacion","humedad","uv"]
  
  medida: string = ""

  private mapaInicial = new Map([
    ["modo","normal"],
    ["panel","temperatura"],
    ["subpanel","inicio"],
    ["cultivo",this.cultivo],
    ["finca",this.fincas[0]],
    ["medida", this.medidas[0]],
  ])
	
	nameMapa: string = "";
  nameTemperatura: string = "";
  namePrecipitacion: string = ""
  nameHumedad: string = "";
  nameUV: string = "";

  srcTemperatura: string = ""
  srcPrecipitacion: string = ""
  srcHumedad: string = ""
  srcUV: string = ""
  srcMapa: string = ""


  urlSafeTemperatura!: SafeResourceUrl;
  urlSafePrecipitacion!: SafeResourceUrl;
  urlSafeHumedad!: SafeResourceUrl;
  urlSafeUV!: SafeResourceUrl;
  urlSafeMapa!: SafeResourceUrl;


  constructor(
    public sanitizer: DomSanitizer,
    private pdf: PDFService,
    private finca: FincaService,
    private cookie: CookieService,
  ) { }

  ngOnInit(): void {
    
    this.cultivo = this.cookie.getItem("Cultivo") as string
    this.finca.get_fincas(this.fincas)

    this.nameFinca = this.nameTemperatura = this.namePrecipitacion = this.nameUV = this.nameHumedad = this.fincas[0];

    this.mapaInicial.set("cultivo",this.cultivo)
    this.mapaInicial.set("finca",this.fincas[0])

    this.mapaInicial.set("panel","temperatura")
    this.srcTemperatura = HttpGrafana.getEmbeddedUrl(this.mapaInicial)

    this.mapaInicial.set("panel","precipitacion")
    this.srcPrecipitacion = HttpGrafana.getEmbeddedUrl(this.mapaInicial)

    this.mapaInicial.set("panel","humedad")
    this.srcHumedad = HttpGrafana.getEmbeddedUrl(this.mapaInicial)

    this.mapaInicial.set("panel","uv")
    this.srcUV = HttpGrafana.getEmbeddedUrl(this.mapaInicial)
    
    this.mapaInicial.set("panel","mapa")
    this.srcMapa = HttpGrafana.getEmbeddedUrlForMapa(this.mapaInicial)

    this.urlSafeTemperatura = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcTemperatura);
    this.urlSafePrecipitacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPrecipitacion);
    this.urlSafeHumedad = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHumedad);
    this.urlSafeUV = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcUV);
    this.urlSafeMapa = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcMapa);
  }
  
  clickMapaByMedida(index: number){
  	this.medida = this.medidas[index]
  	this.mapaInicial.set("panel","mapa")
  	this.mapaInicial.set("medida",this.medida)
  	
  	this.srcMapa = HttpGrafana.getEmbeddedUrlForMapa(this.mapaInicial)
  	this.urlSafeMapa = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcMapa);
  }
  
  clickMapaByFinca(index: number) {
  	this.nameMapa = this.fincas[index]
  	this.mapaInicial.set("panel","mapa")
  	this.mapaInicial.set("finca",this.nameMapa)
  	
  	this.srcMapa = HttpGrafana.getEmbeddedUrl(this.mapaInicial)
  	this.urlSafeMapa = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcMapa);
  }

  clickFinca(index: number){
    this.nameFinca = this.fincas[index]
    this.clickTemperatura(index);
    this.clickPrecipitacion(index);
    this.clickHumedad(index);
    this.clickUV(index);
  }

  clickTemperatura(index: number) {
    this.nameTemperatura = this.fincas[index]
    this.mapaInicial.set("panel","temperatura")
    this.mapaInicial.set("finca",this.nameTemperatura)
    
    this.srcTemperatura = HttpGrafana.getEmbeddedUrl(this.mapaInicial)
    this.urlSafeTemperatura = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcTemperatura );

  }

  clickPrecipitacion(index: number) {
    this.namePrecipitacion = this.fincas[index]
    this.mapaInicial.set("panel","precipitacion")
    this.mapaInicial.set("finca",this.namePrecipitacion)

    this.srcPrecipitacion = HttpGrafana.getEmbeddedUrl(this.mapaInicial)
    this.urlSafePrecipitacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPrecipitacion);

  }

  clickHumedad(index: number) {
    this.nameHumedad = this.fincas[index]
    this.mapaInicial.set("panel","humedad")
    this.mapaInicial.set("finca",this.nameHumedad)

    this.srcHumedad = HttpGrafana.getEmbeddedUrl(this.mapaInicial)
    this.urlSafeHumedad = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHumedad);
  }

  clickUV(index: number) {
    this.nameUV = this.fincas[index]
    this.mapaInicial.set("panel","uv")
    this.mapaInicial.set("finca",this.nameUV)

    this.srcUV = HttpGrafana.getEmbeddedUrl(this.mapaInicial)
    this.urlSafeUV = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcUV);
  }

  toDetails(finca: string) {
    //this.keeper.setFinca(finca)
  }

  generatePDF() {

    let username: string = this.cookie.getItem("User") as string

    let filename = 'reporte-datos-actuales-' + username + '-cultivo-' + this.cultivo

    let listaTexto: Array<string> = []

    listaTexto.push("Reporte de datos del cultivo: " + this.cultivo)
    listaTexto.push("Datos tomados en la última hora")
    listaTexto.push("Temperatura en la finca: " + this.nameTemperatura)
    listaTexto.push("Precipitacion en la finca:" + this.namePrecipitacion)
    listaTexto.push("Humedad en la finca: " + this.nameHumedad)
    listaTexto.push("Indice UV en la finca: " + this.nameUV)
    
    let listaUrl: Array<string> = []

    this.mapaInicial.set("modo","render")

    this.mapaInicial.set("panel","temperatura")
    this.mapaInicial.set("finca",this.nameTemperatura)
    listaUrl.push(HttpGrafana.getEmbeddedUrl(this.mapaInicial))

    this.mapaInicial.set("panel","precipitacion")
    this.mapaInicial.set("finca",this.namePrecipitacion)
    listaUrl.push(HttpGrafana.getEmbeddedUrl(this.mapaInicial))

    this.mapaInicial.set("panel","humedad")
    this.mapaInicial.set("finca",this.nameHumedad)
    listaUrl.push(HttpGrafana.getEmbeddedUrl(this.mapaInicial))

    this.mapaInicial.set("panel","uv")
    this.mapaInicial.set("finca",this.nameUV)
    listaUrl.push(HttpGrafana.getEmbeddedUrl(this.mapaInicial))

    this.pdf.createPDF(filename, listaTexto,listaUrl)

  }



}
