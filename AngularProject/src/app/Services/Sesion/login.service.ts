import { CultivoService } from './../Data/cultivo.service';
import { GrafanaConfigService } from './../Data/grafana-config.service';
import { HttpUrl } from './../../Resources/Constantes/http-url';
import { HttpRequestService } from './../HTTP/http-request.service';
import { HttpHeaders } from '@angular/common/http';
import { SesionService } from './sesion.service';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //private secret_key: string = "c35c0607957d96fd4d8fd53b0840d3b4b7f44ea4854c2b4efa118f635ce5998a*UFfw_GxF-mZyiE9tJmIBeQ*A7lcT_k5ZARxs77FeEmAae5D_yG0htqHEJiDycBstOaKLdoekcjYA0BBpDELBge-I_CA9KNRwjAiRs_2ciOP-Sic6iJ49KYXCnCXxhpuk7s**e71b626fc41725ff8e809d5b09212234a886c6cf9c231281b1efb4745f5d6c1e*yScoJL0j3vmknhFFKJcShCvcsFgpU23XAaRnv4QSC7M"
  private secret_key: any = CryptoJS.enc.Utf8.parse('c35c0607957d96fd')

  constructor(
    private session: SesionService,
    private http: HttpRequestService,
    private grafana_config: GrafanaConfigService,
    private cultivo: CultivoService,
    ) { }

  async login(username: string, password: string){

    let data = {
      username: username,
      password: password,
    }

    let httpOptionsRest = {
      headers: new HttpHeaders({
          "Content-Type": "application/json",
      })
    };

    let encriptado = this.encrypt(JSON.stringify(data))

    let body = {
      raw: encriptado
    }

    
    await this.http.post(HttpUrl.url_login, body , httpOptionsRest)
    .then( (result) => {
      let response: any = result

      this.session.loginSuccesful(response["Auth-token"], response.apikey)

      this.grafana_config.get_config(response["username"])

      this.cultivo.get_cultivos(response["bucket"])
      /*
      console.log(response.message)
      
      if(response.message === 'Logged In'){
        console.log(response.token)
        console.log(response.apikey)
        this.session.loginSuccesful(response.token, response.apikey)
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
        });
        return true
      }
      */
    })
    .catch(error=>{
      let message = 'Hubo un error al enviar la solicitud'
      if(error.status === 404)
        message = 'Usuario o contraseña incorrectos'
      alert(message)
      return false
    })

  } 

  logout(){
    this.session.logout()
  }

  encrypt(mgString: any){
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(mgString, this.secret_key, {
      iv: iv
    });
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64)


  }
}
