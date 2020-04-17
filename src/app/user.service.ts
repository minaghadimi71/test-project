import { Injectable } from '@angular/core';
import {IUser} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [{name: 'mina', id: 1}, {name: 'ali', id: 2}, {name: 'foad', id: 3}];
  use: string;
  constructor() { }
  getUsers() {
    return this.users;
  }
  getUser(id: number) {
    this.users.forEach(user => {
      if (user.id == id) {
        this.use = user.name;
      }
    });
    return this.use;
  }
  editUser(name: string, id: number) {
    // this.users.map(user => {
    //   if (user.id == id) {
    //     user.name = name;
    //   }
    // });
    let userName = this.users.find(
      u => {
        return u.id == id;
      }
    );
    userName.name = name;
    console.log(this.users);
  }
}
