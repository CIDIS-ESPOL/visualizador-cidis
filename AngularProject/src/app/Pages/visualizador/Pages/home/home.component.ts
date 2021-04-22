import { PDFService } from './../../../../Services/Transform/pdf.service';
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

  public cultivo: string = ""

  fincas: Array<string> = []

  nameTemperatura: string = "";
  namePresion: string = ""
  nameHumedad: string = "";
  nameUV: string = "";

  srcTemperatura: string = ""
  srcPresion: string = ""
  srcHumedad: string = ""
  srcUV: string = ""


  urlSafeTemperatura!: SafeResourceUrl;
  urlSafePresion!: SafeResourceUrl;
  urlSafeHumedad!: SafeResourceUrl;
  urlSafeUV!: SafeResourceUrl;


  constructor(
    private singleton: SingletonService,
    public sanitizer: DomSanitizer,
    private pdf: PDFService,
  ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.fincas = [...this.keeper.getFincas()];
    this.cultivo = this.keeper.getCultivo();

    this.nameTemperatura = this.namePresion = this.nameUV = this.nameHumedad = this.keeper.getFinca();

    this.srcTemperatura = this.keeper.getEmbeddedUrl("temperatura", "inicio", this.keeper.getFinca())
    this.srcPresion = this.keeper.getEmbeddedUrl("presion", "inicio", this.keeper.getFinca())
    this.srcHumedad = this.keeper.getEmbeddedUrl("humedad", "inicio", this.keeper.getFinca())
    this.srcUV = this.keeper.getEmbeddedUrl("uv", "inicio", this.keeper.getFinca())

    this.urlSafeTemperatura = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcTemperatura);
    this.urlSafePresion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPresion);
    this.urlSafeHumedad = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHumedad);
    this.urlSafeUV = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcUV);
  }

  clickTemperatura(index: number) {
    this.nameTemperatura = this.fincas[index]
    this.srcTemperatura = this.keeper.getEmbeddedUrl("temperatura", "inicio", this.nameTemperatura)
    this.urlSafeTemperatura = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcTemperatura );

  }

  clickPresion(index: number) {
    this.namePresion = this.fincas[index]
    this.srcPresion = this.keeper.getEmbeddedUrl("presion", "inicio", this.namePresion)
    this.urlSafePresion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPresion);

  }

  clickHumedad(index: number) {
    this.nameHumedad = this.fincas[index]
    this.srcHumedad = this.keeper.getEmbeddedUrl("humedad", "inicio", this.nameHumedad)
    this.urlSafeHumedad = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHumedad);
  }

  clickUV(index: number) {
    this.nameUV = this.fincas[index]
    this.srcUV = this.keeper.getEmbeddedUrl("uv", "inicio", this.nameUV)
    this.urlSafeUV = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcUV);
  }



  toDetails(finca: string) {
    this.keeper.setFinca(finca)
  }

  generatePDF() {

    let filename = 'reporte-datos-actuales-' + this.keeper.getUsername() + '-cultivo-' + this.cultivo

    let listaTexto: Array<string> = []

    listaTexto.push("Reporte de datos del cultivo: " + this.cultivo)
    listaTexto.push("Datos tomados en los últimos 5 minutos")
    listaTexto.push("Temperatura en la finca: " + this.nameTemperatura)
    listaTexto.push("Presión Atmosférica en la finca:" + this.namePresion)
    listaTexto.push("Humedad en la finca: " + this.nameHumedad)
    listaTexto.push("Indice UV en la finca: " + this.nameUV)
    
    let listaUrl: Array<string> = []

    listaUrl.push(this.keeper.getEmbeddedUrlRender("temperatura", "inicio", this.nameTemperatura))
    listaUrl.push(this.keeper.getEmbeddedUrlRender("presion", "inicio", this.namePresion))
    listaUrl.push(this.keeper.getEmbeddedUrlRender("humedad", "inicio", this.nameHumedad))
    listaUrl.push(this.keeper.getEmbeddedUrlRender("uv", "inicio", this.nameUV))

    this.pdf.createPDF(filename, listaTexto,listaUrl)

  }



}
