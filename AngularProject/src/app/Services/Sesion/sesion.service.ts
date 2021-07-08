import { CookieService } from './../Storage/cookie.service';
import { LocalStorageService } from './../Storage/local-storage.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(
    private local: LocalStorageService,
    private cookie: CookieService
    ) { }

  isLoggedIn(): boolean{
    let isLogged = this.cookie.getItem("isLoggedIn")
    if(isLogged === undefined){
      this.cookie.setItem("isLoggedIn", "false")
    }
    return this.cookie.getItem("isLoggedIn") === "true"

  }

  loginSuccesful(token: string, api_key: string, username: string ,bucket: string){
    this.cookie.setItem("isLoggedIn", "true")
    this.cookie.setItem("Token", token)
    this.cookie.setItem("Api_key", api_key)
    this.cookie.setItem("User", username)
    this.cookie.setItem("Bucket",bucket)
  }

  logout(){
    this.cookie.clearAll()
    this.cookie.setItem("isLoggedIn", "false")
  }
}
