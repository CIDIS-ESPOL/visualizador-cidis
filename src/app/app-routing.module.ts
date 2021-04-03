import { LoginComponent } from './Pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: '',  loadChildren: () => import('./Pages/visualizador/visualizador.module').then(m => m.VisualizadorModule),
  },
  {
    path: '**', component: LoginComponent},
  {
    path: '',   redirectTo: 'login' , pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
