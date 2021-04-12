import { SesionService } from './../../Services/Sesion/sesion.service';
import { LoginService } from './../../Services/Sesion/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Keeper } from 'src/app/Resources/Clases/keeper';
import { SingletonService } from 'src/app/Services/Data/singleton.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  keeper: Keeper = new Keeper();

  checkoutForm = this.formBuilder.group({
    user: '',
    password: ''
  });

  private link = ['/dashboard/home'];

  constructor(
    private login: LoginService,
    private session: SesionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private singleton: SingletonService,
  ) { }

  ngOnInit(): void {
    this.singleton.currentObject.subscribe(objectSource => this.keeper = objectSource);
    if(this.session.isLoggedIn()){
      this.router.navigate(this.link);
    }
  }

  onSubmit(): void {
    
    if(this.login.login(this.checkoutForm.value["user"],this.checkoutForm.value["password"])){
      this.router.navigate(this.link);
    }
      
    this.checkoutForm.reset();

  }

}
