import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Keeper } from '../../Resources/Clases/keeper'

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  private objectSource = new BehaviorSubject(new Keeper());
  currentObject = this.objectSource.asObservable();

  constructor() { }

  changeObject(objectSource: Keeper) {
    this.objectSource.next(objectSource);
  }
}
 