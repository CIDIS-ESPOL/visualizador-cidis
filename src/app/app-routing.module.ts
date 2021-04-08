import { AccessGuardService } from './Services/Redirect/access-guard.service';
import { LoginComponent } from './Pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: 'dashboard',  
    loadChildren: () => import('./Pages/visualizador/visualizador.module').then(m => m.VisualizadorModule),
    data:{requiresLogin: true},
    canActivate: [ AccessGuardService ],
  },
  {
    path: '**', component: LoginComponent
  },
  {
    path: '', redirectTo: "login", pathMatch: 'full',
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
