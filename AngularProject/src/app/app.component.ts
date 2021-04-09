import { Component } from '@angular/core';
import { Keeper } from './Resources/Clases/keeper';
import { SingletonService } from './Services/Data/singleton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'visualizador-cidis';

  keeper: Keeper = new Keeper();

  constructor(
    private singleton: SingletonService,
  ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
  }
}
