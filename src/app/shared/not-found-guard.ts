import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class NotFoundGuard {
  constructor(private authService: AuthService, public router: Router) {
  }
}
