import { SesionService } from './sesion.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private session: SesionService) { }

  login(username: string, password: string): boolean{

    if(username === 'admin' && password === 'admin'){
      this.session.loginSuccesful()
      return true
    }

    return false
  } 

  logout(){
    this.session.logout()
  }
}
