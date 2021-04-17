import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { SingletonService } from 'src/app/Services/Data/singleton.service';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  keeper: Keeper = new Keeper();

  private link = ['/seleccion'];

  fincas: Array<string> = []

  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

  username: string = ""

  constructor(
    private singleton: SingletonService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.fincas = [ ...this.keeper.getFincas() ];
    this.username = this.keeper.getUsername()
  }

  toDetails(finca: string){
    this.keeper.setFinca(finca)
  }

  goBack(){
    this.router.navigate(this.link);
  }

}
