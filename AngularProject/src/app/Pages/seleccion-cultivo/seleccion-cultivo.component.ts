import { FincaService } from './../../Services/Data/finca.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { SingletonService } from 'src/app/Services/Data/singleton.service';
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

  private keeper = new Keeper();

  username:string = ""

  cultivos: any = []

  public selectedTab: "one" | "two";
	public tabsContentRef!: ElementRef;

  constructor(
    private login: LoginService,
    private router: Router,
    private singleton: SingletonService,
    private finca: FincaService,

  ) { 
    this.selectedTab = "one";
  }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    this.cultivos = [ ...this.keeper.getCultivos()]
    this.username = this.keeper.getUsername()

  }

  clickCultivo(cultivo: string){
    this.finca.get_fincas(cultivo)

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
