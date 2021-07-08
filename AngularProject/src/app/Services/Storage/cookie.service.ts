import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private keys: string[] = []

  constructor() { }

  public setItem(key: string, value: string) {
    Cookies.set(key, value);
    this.keys.push(key);
  }
    
  public getItem(key: string){ 
    return Cookies.get(key)
  }
  public removeItem(key:string) {
    Cookies.remove(key);
  }

  public clearAll(){
    this.keys.forEach((element) => {
      Cookies.remove(element);
    });
    this.keys = []
  }

}
