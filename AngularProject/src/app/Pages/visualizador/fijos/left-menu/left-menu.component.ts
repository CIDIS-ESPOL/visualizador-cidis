import { FincaService } from './../../../../Services/Data/finca.service';
import { CookieService } from './../../../../Services/Storage/cookie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  

  private link = ['/seleccion'];

  fincas: Array<string> = []
  cultivo: string = ""

  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;

  username: string = ""

  constructor(
    private router: Router,
    private cookie: CookieService,
    private finca: FincaService,
    ) {}

  ngOnInit(): void {
    this.cultivo = this.cookie.getItem("Cultivo") as string
    this.finca.get_fincas(this.fincas)
    this.username = this.cookie.getItem("User") as string

  }

  toDetails(finca: string){
    
  }

  goBack(){
    this.cookie.removeItem("Fincas");
    this.router.navigate(this.link);
  }

}
