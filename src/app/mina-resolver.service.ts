import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IUser} from './user';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MinaResolver implements Resolve<IUser> {
  public user: IUser = {id: 1, name: 'kkkkk'};
  constructor(private Userservice: UserService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser> | Promise<IUser> | IUser {
    this.user.id = +route.params["id"];
    this.user.name = this.Userservice.getUser(+route.params["id"]);
    return this.user;
  }
}
