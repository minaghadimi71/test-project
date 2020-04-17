import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
public login = false;
  constructor(private http: HttpClient) {
  }
  onChecked() {
   const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => resolve(this.login),
        1000);
      }
    );
   return promise;
  }
  onLogIn() {
    this.login = true;
  }
  onLogOut() {
    this.login = false;
  }
  mina() {
    return this.http.get('...');
  }
}
