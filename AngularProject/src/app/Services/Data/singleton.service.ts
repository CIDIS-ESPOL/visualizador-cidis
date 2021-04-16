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

  constructor() {}

  changeObject(objectSource: Keeper) {
    this.objectSource.next(objectSource);
  }
}
 