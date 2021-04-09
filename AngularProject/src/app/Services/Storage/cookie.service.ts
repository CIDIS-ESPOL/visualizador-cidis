import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  public setItem(key: string, value: string) {
    Cookies.set(key, value);
  }
    
  public getItem(key: string){ 
    return Cookies.get(key)
  }
  public removeItem(key:string) {
    Cookies.remove(key);
  }

}
