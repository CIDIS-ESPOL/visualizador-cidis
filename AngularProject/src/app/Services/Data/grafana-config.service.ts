import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';
import { SingletonService } from './singleton.service';

@Injectable({
  providedIn: 'root'
})
export class GrafanaConfigService {

  private keeper = new Keeper()

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
    private singleton: SingletonService,
    ) { }

    get_config(username: string){
      this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);

      this.keeper.setUsername(username)

      let token = this.cookie.getItem('Token')


      let httpOptionsRest = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Token " + token
        })
      };

      this.http.get(HttpUrl.url_grafana_config,httpOptionsRest)
      .then(result => {
        let response: any = result 

        HttpUrl.setUrl_Grafana(response["url"])

        let lista = []
        lista.push(response["temperatura_inicio"])
        lista.push(response["temperatura_historico"])
        lista.push(response["presion_inicio"])
        lista.push(response["presion_historico"])
        lista.push(response["humedad_inicio"])
        lista.push(response["humedad_historico"])
        lista.push(response["uv_inicio"])
        lista.push(response["uv_historico"])
        lista.push(response["comparacion"])

        this.keeper.init_links(lista)

        this.keeper.setVarBucket(response["buckets_variable"])
        this.keeper.setVarCultivo(response["cultivos_variable"])
        this.keeper.setVarFinca(response["finca_variable"])
        this.keeper.setVarMedida(response["medidas_variable"])
        this.keeper.setVarFinca2(response["finca2_variable"])
      })
      .catch(error => {
        console.log(error)
      })

    }


}
