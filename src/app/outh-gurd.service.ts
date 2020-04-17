import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OuthGurd implements CanActivate, CanActivateChild {
  constructor(private loginServise: LoginService, private route: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.loginServise.onChecked().then(
      (b: boolean) => {
        if (b) {
          return true;
        } else {
          this.route.navigate(['/']);
          return false;
        }
      }
    );
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state);
  }
}
