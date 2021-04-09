import { SesionService } from './../Sesion/sesion.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate{

  constructor(private session: SesionService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiresLogin = route.data.requiresLogin || false;
    if (requiresLogin) {
      // Check that the user is logged in...
      return this.session.isLoggedIn()
    }
    return false
  }
}
