import { CookieService } from './../../../../Services/Storage/cookie.service';
import { HttpGrafana } from './../../../../Resources/Constantes/http-grafana';
import { FincaService } from './../../../../Services/Data/finca.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';
import { PDFService } from 'src/app/Services/Transform/pdf.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.scss']
})
export class HumedadComponent implements OnInit {

  @Input()

  tiempos: Array<string> = []
  tiempoSeleccionado: string = ""

  cultivo: string = ""
  finca: string = ""
  finca2: string = ""

  fincas2: Array<string> = []

  private mapaInicial = new Map([
    ["modo","normal"],
    ["panel","humedad"],
    ["subpanel","inicio"],
    ["cultivo",this.cultivo],
    ["finca",this.finca],
    ["tiempo",""],
    ["medida","humedad"],
    ["finca2",""]
  ])

  srcInicio:string = "";
  srcHistorico:string = "";
  srcComparacion: string = "";

  urlSafeInicio!: SafeResourceUrl;
  urlSafeHistorico!: SafeResourceUrl;
  urlSafeComparacion!: SafeResourceUrl;

  constructor(
    public sanitizer: DomSanitizer,
    private pdf: PDFService,
    private route: ActivatedRoute,
    private fincaS: FincaService,
    private cookie: CookieService,
  ) { }

  ngOnInit(): void {
    
    let paramsObject: any

    this.route.paramMap.subscribe(params => {
        this.cultivo = params.get('cultivo') as string
    	this.finca = params.get('finca') as string
    });  

    this.fincaS.get_fincas(this.cultivo,this.fincas2)

    this.tiempos = [ ...HttpGrafana.getTiempos() ]
    this.tiempoSeleccionado = this.tiempos[0]
    this.finca2 = this.fincas2[0]

    this.mapaInicial.set("cultivo",this.cultivo)
    this.mapaInicial.set("finca",this.finca)

    this.srcInicio = HttpGrafana.getEmbeddedUrl(this.mapaInicial)

    this.mapaInicial.set("subpanel","historico")
    this.srcHistorico = HttpGrafana.getEmbeddedUrl(this.mapaInicial)

    this.mapaInicial.set("panel","comparacion")
    this.mapaInicial.set("subpanel","inicio")
    this.mapaInicial.set("tiempo",this.tiempoSeleccionado)
    this.mapaInicial.set("finca2",this.finca2)
    this.srcComparacion =  HttpGrafana.getEmbeddedUrlByTimeComparacion(this.mapaInicial)

    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcInicio);
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHistorico);
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcComparacion);
  }

  clickTiempo(tiempo: string): void{
    this.tiempoSeleccionado = tiempo
    this.mapaInicial.set("tiempo",this.tiempoSeleccionado)

    this.mapaInicial.set("panel","humedad")
    this.mapaInicial.set("subpanel","inicio")
    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(HttpGrafana.getEmbeddedUrlByTime(this.mapaInicial));

    this.mapaInicial.set("subpanel","historico")
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(HttpGrafana.getEmbeddedUrlByTime(this.mapaInicial));
    
    this.mapaInicial.set("panel","comparacion")
    this.mapaInicial.set("subpanel","inicio")
    this.mapaInicial.set("tiempo",this.tiempoSeleccionado)
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(HttpGrafana.getEmbeddedUrlByTimeComparacion(this.mapaInicial));
  }

  clickFinca(finca: string): void{
    this.finca2 = finca
    this.mapaInicial.set("panel","comparacion")
    this.mapaInicial.set("subpanel","inicio")
    this.mapaInicial.set("finca2",this.finca2)
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(HttpGrafana.getEmbeddedUrlByTimeComparacion(this.mapaInicial));
  }

  generatePDF() {

    let username: string = this.cookie.getItem("User") as string

    let filename = 'reporte-detallado-humedad-' + username + '-cultivo-' + this.cultivo

    let listaTexto: Array<string> = []

    listaTexto.push("Reporte detallado del nivel de humedad del cultivo: " + this.cultivo)
    listaTexto.push("Datos tomados en el tiempo: " + this.tiempoSeleccionado + " en la finca: " + this.finca)
    listaTexto.push("Nivel de Humedad Promedio: ")
    listaTexto.push("Registro Histórico: ")
    listaTexto.push("Gráfico Comparativo con la finca " + this.finca2 + ": ")
    
    let listaUrl: Array<string> = []

    this.mapaInicial.set("panel","humedad")
    this.mapaInicial.set("subpanel","inicio")
    listaUrl.push(HttpGrafana.getEmbeddedUrlByTime(this.mapaInicial))

    this.mapaInicial.set("subpanel","historico")
    listaUrl.push(HttpGrafana.getEmbeddedUrlByTime(this.mapaInicial))
    
    this.mapaInicial.set("panel","comparacion")
    this.mapaInicial.set("subpanel","inicio")
    listaUrl.push(HttpGrafana.getEmbeddedUrlByTimeComparacion(this.mapaInicial))

    this.pdf.createPDF(filename, listaTexto,listaUrl)

  }

}
