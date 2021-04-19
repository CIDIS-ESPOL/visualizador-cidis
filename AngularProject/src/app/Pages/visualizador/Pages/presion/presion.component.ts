import { SingletonService } from '../../../../Services/Data/singleton.service';
import { Keeper } from '../../../../Resources/Clases/keeper';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Component, OnInit, Input } from '@angular/core';

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
    public sanitizer: DomSanitizer
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
    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrlByTime("temperatura","inicio",tiempo));
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrlByTime("temperatura","historico",tiempo));
    this.srcComparacion = this.keeper.getEmbeddedUrlByTimeComparacion("presion","comparacion",tiempo,this.finca2);
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcComparacion);
  }

  clickFinca(finca: string): void{
    this.finca2 = finca
    this.srcComparacion = this.keeper.getEmbeddedUrlByTimeComparacion("presion","comparacion",this.tiempoSeleccionado,finca);
    this.urlSafeComparacion = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcComparacion);
  }
}
