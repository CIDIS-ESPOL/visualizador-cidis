import { SingletonService } from '../../../../Services/Data/singleton.service';
import { Keeper } from '../../../../Resources/Clases/keeper';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Component, OnInit, Input } from '@angular/core';
import { PDFService } from 'src/app/Services/Transform/pdf.service';

@Component({
  selector: 'app-presion',
  templateUrl: './presion.component.html',
  styleUrls: ['./presion.component.scss']
})
export class PresionComponent implements OnInit {

  @Input()

  keeper: Keeper = new Keeper();

  tiempos: Array<string> = []
  tiempoSeleccionado: string = ""

  finca: string = ""
  finca2: string = ""

  fincas2: Array<string> = []

  srcInicio:string = "";
  srcHistorico:string = "";
  srcComparacion: string = "";

  urlSafeInicio!: SafeResourceUrl;
  urlSafeHistorico!: SafeResourceUrl;
  urlSafeComparacion!: SafeResourceUrl;

  constructor(
    private singleton: SingletonService,
    public sanitizer: DomSanitizer,
    private pdf: PDFService,
  ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.finca = this.keeper.getFinca()
    let temp = [ ...this.keeper.getFincas() ]
    temp.forEach((element:any) =>{
      if(element !== this.finca)
        this.fincas2.push(element)
    })
    this.tiempos = [ ...this.keeper.getTiempos() ]
    this.tiempoSeleccionado = this.tiempos[0]
    this.finca2 = this.fincas2[0]

    this.srcInicio = this.keeper.getEmbeddedUrl("presion","inicio",this.finca)
    this.srcHistorico = this.keeper.getEmbeddedUrl("presion","historico",this.finca)
    this.srcComparacion = this.keeper.getEmbeddedUrlByTimeComparacion("presion","comparacion",this.tiempoSeleccionado,this.fincas2[0]);

    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcInicio);
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHistorico);
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcComparacion);
  }

  clickTiempo(tiempo: string): void{
    this.tiempoSeleccionado = tiempo
    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrlByTime("presion","inicio",tiempo));
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrlByTime("presion","historico",tiempo));
    this.srcComparacion = this.keeper.getEmbeddedUrlByTimeComparacion("presion","comparacion",tiempo,this.finca2);
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcComparacion);
  }

  clickFinca(finca: string): void{
    this.finca2 = finca
    this.srcComparacion = this.keeper.getEmbeddedUrlByTimeComparacion("presion","comparacion",this.tiempoSeleccionado,finca);
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcComparacion);
  }

  generatePDF() {

    let filename = 'reporte-detallado-presion-atmosferica-' + this.keeper.getUsername() + '-cultivo-' + this.keeper.getCultivo()

    let listaTexto: Array<string> = []

    listaTexto.push("Reporte detallado del nivel de Presión Atmosférica del cultivo: " + this.keeper.getCultivo())
    listaTexto.push("Datos tomados en el tiempo: " + this.tiempoSeleccionado + " en la finca: " + this.finca)
    listaTexto.push("Nivel de Presión Atmosférica Promedio: ")
    listaTexto.push("Registro Histórico: ")
    listaTexto.push("Gráfico Comparativo con la finca " + this.finca2 + ": ")
    
    let listaUrl: Array<string> = []

    listaUrl.push(this.keeper.getEmbeddedUrlByTimeRender("presion","inicio",this.tiempoSeleccionado))
    listaUrl.push(this.keeper.getEmbeddedUrlByTimeRender("presion","historico",this.tiempoSeleccionado))
    listaUrl.push(this.keeper.getEmbeddedUrlByTimeComparacionRender("presion","comparacion",this.tiempoSeleccionado,this.finca2))

    this.pdf.createPDF(filename, listaTexto,listaUrl)

  }
}
