import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpUrl } from 'src/app/Resources/Constantes/http-url';
import { Keeper } from '../../Resources/Clases/keeper'
import { HttpRequestService } from '../HTTP/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  private objectSource = new BehaviorSubject(new Keeper());
  currentObject = this.objectSource.asObservable();

  constructor(private http: HttpRequestService) { 

    this.http.get(HttpUrl.urlMiddleware + 'sensores', {})
        .then( result => {
            let response: any = result
            console.log(response.message[0])
            this.objectSource.value.setSensores(response.message)
            this.objectSource.value.setSensor(response.message[0])
        }).catch(error => {
            console.log(error)
        })

  }

  changeObject(objectSource: Keeper) {
    this.objectSource.next(objectSource);
  }
}
 