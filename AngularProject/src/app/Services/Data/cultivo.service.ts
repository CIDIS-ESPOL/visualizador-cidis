import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';
import { SingletonService } from './singleton.service';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  private keeper = new Keeper()

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
    private singleton: SingletonService,
    private router: Router,
  ) { }

  get_cultivos(bucket: string) {

    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);

    this.keeper.setBucket(bucket)

    let token = this.cookie.getItem('Token')

    let data = {
      bucket: bucket
    }

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      })
    };

    this.http.post(HttpUrl.url_cultivos_1,data,httpOptionsRest)
    .then(result => {
      let response:any = result
      let cultivos: { nombre: any; imagen: string; }[] = []
      response.forEach((element: any) => {
        let cultivo = {
          nombre: element["nombre"],
          imagen : HttpUrl.urlMiddleware + "static" + element["imagen"]
        }
        cultivos.push(cultivo)
      });
      this.keeper.setCultivos(cultivos)
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    })
    .catch(error => {
      console.log(error)
    })

    /*
    
    */

  }
}
