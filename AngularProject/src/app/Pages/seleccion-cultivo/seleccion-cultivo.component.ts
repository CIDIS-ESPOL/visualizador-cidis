import { CultivoService } from './../../Services/Data/cultivo.service';
import { CookieService } from './../../Services/Storage/cookie.service';
import { FincaService } from './../../Services/Data/finca.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/Sesion/login.service';

@Component({
  selector: 'app-seleccion-cultivo',
  queries: {
		"tabsContentRef": new ViewChild( "tabsContentRef" )
	},
  templateUrl: './seleccion-cultivo.component.html',
  styleUrls: ['./seleccion-cultivo.component.scss']
})
export class SeleccionCultivoComponent implements OnInit {

  private link = ['/login'];
  private link2 = ['/dashboard/home']

  username:string = ""

  cultivos: { nombre: any; imagen: string; }[] = []

  public selectedTab: "one" | "two";
	public tabsContentRef!: ElementRef;

  constructor(
    private login: LoginService,
    private router: Router,
    private finca: FincaService,
    private cookie: CookieService,
    private cultivo: CultivoService

  ) { 
    this.selectedTab = "one";
  }

  ngOnInit(): void {
    this.cultivo.get_cultivos(this.cultivos)
    this.username = this.cookie.getItem("User") as string

  }

  clickCultivo(cultivo: string){
    this.cookie.setItem("Cultivo",cultivo)
    this.router.navigate(this.link2);

  }

  clickLogout(){
    this.login.logout()
    this.router.navigate(this.link);
  }

  public show( tab: "one" | "two" ) : void {
 
		this.selectedTab = tab;
		// By default - the default behavior of the browser - when we change the content
		// of an overflow-container, the overflow-container doesn't change its scroll
		// offset unless it suddenly has less content than it did before. As such, when
		// the tab-content changes, we have to explicitly scroll the overflow-container
		// back to the top.
		this.scrollTabContentToTop();
 
	}
 
	// ---
	// PRIVATE METHODS.
	// ---
 
	// I scroll the tab-content overflow-container back to the top.
	private scrollTabContentToTop() : void {
 
		this.tabsContentRef.nativeElement.scrollTo( 0, 0 );
 
	}

}
