import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';


@Injectable({
  providedIn: 'root'
})
export class FincaService {

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
  ) { }

  get_fincas(cultivo: string, fincas: string[]) {

    let values = this.cookie.getItem("Fincas")
    
    console.log(values)

    if (values !== undefined) {
    
    	if(values.length > 11){
    		let object = JSON.parse(values)

      object["data"].forEach((element: string) => {
        fincas.push(element)
      });
    }
    }else {
      let bucket = this.cookie.getItem("Bucket")

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

      this.http.post(HttpUrl.url_fincas, data, httpOptionsRest)
        .then(result => {
          let response: any = result
          
          console.log(response.fincas)

          response.fincas.forEach((element: any) => {
            fincas.push(element)
          });

          let temp = {
            data: fincas
          }

          this.cookie.setItem("Fincas", JSON.stringify(temp));


        })
        .catch(error => {
          console.log(error)
          alert('Hubo un problema al enviar solicitud')
        })
    }

    



    /*
    
    */

  }
}
