import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {CustomValidator} from '../../shared/validator/custom-validator';

@Component({
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  registerForm: FormGroup;
  genders = ['men', 'women'];
  forbiddenName = ['mina', 'alireza'];
  isShow: boolean = false;
  resetHtml = new BehaviorSubject<boolean>(null);
  user = {
    name: '',
    surname: '',
    member: '',
    mazrab: '',
    address: {country: '', city: ''},
    gender: '',
    friends: [],
  };
  users = {
    name: '',
    surname: '',
    member: '',
    mazrab: '',
    address: {country: '', city: ''},
    gender: '',
    friends: [],
  };

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      surname: new FormControl(null, [Validators.required], this.forbiddenSurname),
      member: new FormControl(null),
      mazrab: new FormControl(1),
      address: new FormGroup({
        country: new FormControl(null, [Validators.required, CustomValidator.staticValidator]),
        city: new FormControl(null, Validators.required, CustomValidator.dynamicValidator),
      }),
      // gender: new FormControl('men'),
      gender: new FormControl(null),
      friends: new FormArray([]),
    });
    this.registerForm.valueChanges.subscribe(
      value => {
        this.user.name = value.name;
        this.user.surname = value.surname;
        this.user.mazrab = value.mazrab;
        this.user.member = value.member;
        this.user.address.country = value.address.country;
        this.user.address.city = value.address.city;
        this.user.gender = value.gender;
        this.user.friends = [];
        if (value.friends.length > 0) {
          value.friends.forEach((friend) => {
            this.user.friends.push(friend);
          });
        }
      }
    );
    this.registerForm.statusChanges.subscribe(
      status => {
        // console.log(status);
      }
    );
    // in reactive yo can do it but in template you cant it
    // this.patchValue();
    // this.setValue();
  }

  setValue() {
    (this.registerForm.get('friends') as FormArray).clear();
    this.addFriends();
    this.addFriends();
    this.registerForm.setValue({
      name: 'mina',
      surname: 'ghadimi',
      member: '5',
      mazrab: '10',
      address: {
        country: 'iran',
        city: 'tehran'
      },
      gender: 'women',
      friends: ['Asal', 'Ali']
    });
    this.resetHtml.next(true);
  }

  patchValue() {
    (this.registerForm.get('friends') as FormArray).clear();
    this.addFriends();
    this.addFriends();
    this.registerForm.patchValue({
      friends: ['Asal-2', 'Ali-2']
    });
  }

  backToTemplate() {
    this.router.navigate(['./template'], {queryParams: {back: 'back-reactive'}});
  }

  addFriends() {
    const friend = new FormControl(null, [Validators.required, this.forbidden.bind(this)]);
    (this.registerForm.get('friends') as FormArray).push(friend);
  }

  onsubmite() {
    this.isShow = true;
    this.resetHtml.next(false);
    console.log(this.registerForm);
    this.users.name = this.registerForm.get('name').value;
    this.users.surname = this.registerForm.get('surname').value;
    this.users.mazrab = this.registerForm.get('mazrab').value;
    this.users.member = this.registerForm.get('member').value;
    this.users.address.country = this.registerForm.get('address.country').value;
    this.users.address.city = this.registerForm.get('address.city').value;
    this.users.gender = this.registerForm.get('gender').value;
    const arrayFriends = this.registerForm.get('friends') as FormArray;
    this.users.friends = [];
    arrayFriends.controls.forEach((friend) => {
      this.users.friends.push(friend.value);
    });
    (this.registerForm.get('friends') as FormArray).clear();
    this.registerForm.reset();
    // this.registerForm.get('gender').reset('women');
  }

  clearMember() {
    this.registerForm.get('member').reset();
  }

  forbidden(name: FormControl): { [name: string]: boolean } {
    if (this.forbiddenName.indexOf(name.value) !== -1) {
      return {forbiddenName: true};
    } else {
      return null;
    }
  }

  forbiddenSurname(name: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise<any>((resole, reject) => {
      setTimeout(() => {
          if (name.value === 'ghadimi') {
            resole({forbiddenSurname: true});
          }
          resole(null);
        }
        , 5000);
    });
    return promise;

  }

  get friends() {
    return this.registerForm.get('friends') as FormArray;
  }
  getIsShow() {
    if (this.user.name
      || this.user.surname
      || this.user.mazrab ||
      this.user.member ||
      this.user.address.country ||
    this.user.address.city ||
      this.user.gender ||
      this.user.friends.length
    ) {
      this.isShow = false;
      return true;
    } else {
      return false;
    }
  }
}
