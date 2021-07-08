import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';


@Injectable({
  providedIn: 'root'
})
export class CultivoService {

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
    private router: Router,
  ) { }

  get_cultivos(cultivos: { nombre: any; imagen: string; }[]) {

    let values = this.cookie.getItem("Cultivos")
    

    if (values !== undefined) {
    
    
    if(values.length > 11){
    		
    		let object = JSON.parse(values)

      object["data"].forEach((element: { nombre: any; imagen: string; }) => {
        cultivos.push(element)
      });
    }
    

      

    } else {
    
    
      
      let bucket = this.cookie.getItem("Bucket")

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

      this.http.post(HttpUrl.url_cultivos, data, httpOptionsRest)
        .then(result => {
          let response: any = result

          response.forEach((element: any) => {
            let cultivo = {
              nombre: element["nombre"],
              imagen: HttpUrl.urlMiddleware + "static" + element["imagen"]
            }
            cultivos.push(cultivo)
          });

          let temp = {
            data: cultivos
          }
          
          

          this.cookie.setItem("Cultivos", JSON.stringify(temp));

        })
        .catch(error => {
          console.log(error)
          alert('Hubo un error en la peticion')
        })
    }
	   
    	
  }
  
}
