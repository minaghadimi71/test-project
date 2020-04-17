import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DropDownService} from './drop-down.service';
import {Injectable} from '@angular/core';

interface Server {
  name: string;
  id: number;
  description: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<Server> {
  constructor(private dropDownService: DropDownService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot):
    Observable<Server> | Promise<Server> | Server {
    const id = +route.params['id'];
    const server: Server = this.dropDownService.returnServer(id);
    return server;
  }

}
