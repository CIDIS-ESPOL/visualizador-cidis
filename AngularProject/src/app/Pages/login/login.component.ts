import { SesionService } from './../../Services/Sesion/sesion.service';
import { LoginService } from './../../Services/Sesion/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    if(this.session.isLoggedIn()){
      this.router.navigate(this.link);
    }
  }

  onSubmit(): void {
    if(this.login.login(this.checkoutForm.value["user"],this.checkoutForm.value["password"])){
      this.router.navigate(this.link);
    }
    else{
      alert("Usuario o Contraseña incorrectos")
    }
      
    this.checkoutForm.reset();
  }

}
