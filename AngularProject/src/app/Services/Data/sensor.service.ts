import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { HttpRequestService } from '../HTTP/http-request.service';
import { CookieService } from '../Storage/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(
    private http: HttpRequestService,
    private cookie: CookieService,
    private router: Router
  ) { }

  get_sensores(sensores: any[]) {

    let bucket = this.cookie.getItem("Bucket")

    let token = this.cookie.getItem('Token')

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      })
    };

    this.http.get(HttpUrl.url_sensores + '/' + bucket, httpOptionsRest)
      .then(result => {
        let response: any = result

        console.log(response.data)

        response.data.forEach((element: any) => {
          sensores.push(element)
        });

      })
      .catch(error => {
        console.log(error)
        alert('Hubo un problema al enviar solicitud')
      })

  }



  crear_sensor(sensorid: string, data: any) {

    let bucket = this.cookie.getItem("Bucket")

    let token = this.cookie.getItem('Token')

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      })
    };

    data['bucket'] = bucket

    this.http.post(HttpUrl.url_sensores_crud + '/' + sensorid, data, httpOptionsRest)
      .then(result => {
        alert('Sensor creado exitosamente')
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
        alert('Hubo un problema al enviar solicitud')
      })

  }

  actualizar_sensor(sensorid: string, data: any) {

    let token = this.cookie.getItem('Token')

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      })
    };

    this.http.put(HttpUrl.url_sensores_crud + '/' + sensorid, data, httpOptionsRest)
      .then(result => {
        alert('Sensor actualizado exitosamente')
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
        alert('Hubo un problema al enviar solicitud')
      })

  }

  eliminar_sensor(sensorid: string) {

    let token = this.cookie.getItem('Token')

    let httpOptionsRest = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Token " + token
      })
    };

    this.http.delete(HttpUrl.url_sensores_crud + '/' + sensorid, {},httpOptionsRest)
      .then(result => {
        alert('Sensor eliminado exitosamente')
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
        alert('Hubo un problema al enviar solicitud')
      })

  }
}
