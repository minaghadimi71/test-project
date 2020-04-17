import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IUser} from '../user';
import {ActivatedRoute, Data, Params} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('mina', {static: false}) name: ElementRef;
user: IUser;
  constructor(private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    // this.route.params.subscribe(
    //   (param: Params) => {
    //     this.user.id = param['id'];
    //     this.user.name = this.userService.getUser(+param['id']);
    //   }
    // );
    this.route.data.subscribe(
      (data: Data) => {
        this.user = data["loadUser"];
      }
    );
    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('foo');
      }, 5000);
    });

    promise1.then(function(value) {
      console.log(value);
      // expected output: "foo"
    });

  }
  editUser() {
    let id: number;
    this.route.queryParams.subscribe(param => id = +param.allowEdit);
    if (id === 1) {
      this.user.name = this.name.nativeElement.value;
      this.userService.editUser(this.name.nativeElement.value, this.user.id);
    }
  }
  mina() {
    console.log('1cc');
    return true;
  }
}
