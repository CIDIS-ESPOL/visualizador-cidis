import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Sesion/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;

  private link = ['/login'];

  constructor(
    private login: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  clickLogout(){
    this.login.logout()
    this.router.navigate(this.link)
  }

}
