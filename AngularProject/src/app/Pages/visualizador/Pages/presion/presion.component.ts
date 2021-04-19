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
    this.finca = this.keeper.getFinca()
    this.tiempos = [ ...this.keeper.getTiempos() ]
    this.tiempoSeleccionado = this.tiempos[0]

    this.srcInicio = this.keeper.getEmbeddedUrl("presion","inicio",this.finca)
    this.srcHistorico = this.keeper.getEmbeddedUrl("presion","historico",this.finca)

    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcInicio);
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHistorico);
  }

  clickTiempo(tiempo: string): void{
    this.tiempoSeleccionado = tiempo
    this.urlSafeInicio = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrlByTime("temperatura","inicio",tiempo));
    this.urlSafeHistorico = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrlByTime("temperatura","historico",tiempo));
  }
}
