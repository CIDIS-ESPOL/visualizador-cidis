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
  srcPresion:string = ""
  srcHumedad:string = ""
  srcUV: string = ""
  

  urlSafeTemperatura!: SafeResourceUrl;
  urlSafePresion!: SafeResourceUrl;
  urlSafeHumedad!: SafeResourceUrl;
  urlSafeUV!: SafeResourceUrl;
  

  constructor(
    private singleton: SingletonService,
    public sanitizer: DomSanitizer,
    ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.fincas = [ ...this.keeper.getFincas() ];
    this.cultivo = this.keeper.getCultivo();

    this.nameTemperatura = this.namePresion = this.nameUV = this.nameHumedad = this.keeper.getFinca();

    this.srcTemperatura = this.keeper.getEmbeddedUrl("temperatura","inicio",this.keeper.getFinca())
    this.srcPresion = this.keeper.getEmbeddedUrl("presion","inicio",this.keeper.getFinca())
    this.srcHumedad = this.keeper.getEmbeddedUrl("humedad","inicio",this.keeper.getFinca())
    this.srcUV = this.keeper.getEmbeddedUrl("uv","inicio",this.keeper.getFinca())

    this.urlSafeTemperatura= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcTemperatura);
    this.urlSafePresion= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcPresion);
    this.urlSafeHumedad= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcHumedad);
    this.urlSafeUV= this.sanitizer.bypassSecurityTrustResourceUrl(this.srcUV);
  }

  clickTemperatura(index: number){
    this.nameTemperatura = this.fincas[index]
    this.urlSafeTemperatura= this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl("temperatura","inicio",this.nameTemperatura));
    
  }

  clickPresion(index: number){
    this.namePresion = this.fincas[index]
    this.urlSafePresion= this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl("presion","inicio",this.namePresion));
    
  }

  clickHumedad(index: number){
    this.nameHumedad = this.fincas[index]
    this.urlSafeHumedad = this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl("humedad","inicio",this.nameHumedad));
  }

  clickUV(index: number){
    this.nameUV = this.fincas[index]
    this.urlSafeUV= this.sanitizer.bypassSecurityTrustResourceUrl(this.keeper.getEmbeddedUrl("uv","inicio",this.nameUV));
  }

  

  toDetails(finca:string){
    this.keeper.setFinca(finca)
  }

  

}
