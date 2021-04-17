import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';
import { SingletonService } from './singleton.service';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  private keeper = new Keeper()

  private link = ['/dashboard/home'];

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
    private singleton: SingletonService,
    private router: Router,
  ) { }

  get_fincas(cultivo: string) {

    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);

    let bucket = this.keeper.getBucket()

    this.keeper.setCultivo(cultivo)

    let token = this.cookie.getItem('Token')

    let data = {
      bucket: bucket,
      cultivo: cultivo
    }

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      })
    };

    this.http.post(HttpUrl.url_fincas,data,httpOptionsRest)
    .then(result => {
      let response:any = result

      this.keeper.setFincas(response["fincas"])
      this.keeper.setFinca(response["fincas"][0])
     
      this.router.navigate(this.link);
    })
    .catch(error => {
      console.log(error)
      alert('Hubo un problema al enviar solicitud')
    })

    /*
    
    */

  }
}
