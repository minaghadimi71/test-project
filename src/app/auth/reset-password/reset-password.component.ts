import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../shared/toast/toast.service';

@Component({
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  @ViewChild('resetPassword', {static: false}) resetPassword: NgForm;
  constructor(public authService: AuthService,
              private route: Router,
              private toastService: ToastService) {
  }
  resetPass() {
    console.log(this.resetPassword.value.email);
    this.authService.resetPassword(this.resetPassword.value.email).subscribe(
      res => {
        this.toastService.show('Succeed', 'email is send', 'succeed');
        this.route.navigate(['./auth']);
    },
      error => {
        this.toastService.show('Error', 'email is not send', 'error');
      }
    );
  }
  backToAuth() {
    this.route.navigate(['./auth']);
  }
}
