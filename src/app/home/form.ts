import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventEmitter, OnInit} from '@angular/core';
import {LoginService} from '../login.service';

export class FormComponent implements OnInit{
form: FormGroup;
totalValue = 1;
value;
emie = new EventEmitter();
constructor(fb: FormBuilder, private loginService: LoginService) {
  this.form = fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
  });
}
upper() {
  this.totalValue ++;
  this.emie.emit(this.totalValue);
}
ngOnInit(): void {
  this.loginService.mina().subscribe(t => {
    this.value = t;
  });
}
}
