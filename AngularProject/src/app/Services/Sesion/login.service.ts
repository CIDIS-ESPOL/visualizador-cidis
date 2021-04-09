import { HttpUrl } from './../../Resources/Constantes/http-url';
import { HttpClient } from '@angular/common/http';
import { HttpRequestService } from './../HTTP/http-request.service';
import { HttpHeaders } from '@angular/common/http';
import { SesionService } from './sesion.service';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private secret_key: string = "c35c0607957d96fd4d8fd53b0840d3b4b7f44ea4854c2b4efa118f635ce5998a*UFfw_GxF-mZyiE9tJmIBeQ*A7lcT_k5ZARxs77FeEmAae5D_yG0htqHEJiDycBstOaKLdoekcjYA0BBpDELBge-I_CA9KNRwjAiRs_2ciOP-Sic6iJ49KYXCnCXxhpuk7s**e71b626fc41725ff8e809d5b09212234a886c6cf9c231281b1efb4745f5d6c1e*yScoJL0j3vmknhFFKJcShCvcsFgpU23XAaRnv4QSC7M"

  constructor(
    private session: SesionService,
    private http: HttpRequestService,
    private httpClient: HttpClient,
    ) { }

  async login(username: string, password: string){

    let data = {
      user: username,
      password: password,
    }

    let httpOptionsRest = {
      headers: new HttpHeaders({
          "Content-Type": "application/json",
      })
    };

    let encriptado = CryptoJS.AES.encrypt(JSON.stringify(data).trim(), this.secret_key.trim()).toString();

    let body = {
      raw: encriptado
    }

    
    await this.http.post(HttpUrl.urlMiddleware + 'login', body , httpOptionsRest)
    .then( (result) => {
      let response: any = result

      console.log(response.message)
      
      if(response.message === 'Logged In'){
        this.session.loginSuccesful()
        return true
      }
      alert('Usuario o contraseña incorrectos')
      return false
    })
    .catch(error=>{
      console.log(error)
      alert('Hubo un error al enviar la solicitud')
      return false
    })

  } 

  logout(){
    this.session.logout()
  }
}
