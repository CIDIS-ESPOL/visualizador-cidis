import { Component, OnInit } from '@angular/core';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { SingletonService } from 'src/app/Services/Data/singleton.service';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  keeper: Keeper = new Keeper();

  sensores: Array<string> = []

  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

  constructor(
    private singleton: SingletonService
    ) {}

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.sensores = [ ...this.keeper.getSensorNames() ];
  }

  toDetails(sensor: string){
    this.keeper.setSensor(sensor)
  }

}
