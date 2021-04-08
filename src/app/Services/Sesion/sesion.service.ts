import { LocalStorageService } from './../Storage/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private local: LocalStorageService) { }

  isLoggedIn(): boolean{
    let isLogged = this.local.getItem("isLoggedIn")
    if(isLogged === undefined){
      this.local.setItem("isLoggedIn", "false")
    }
    return this.local.getItem("isLoggedIn") === "true"

  }

  loginSuccesful(){
    this.local.setItem("isLoggedIn", "true")
  }

  logout(){
    this.local.setItem("isLoggedIn", "false")
  }
}
