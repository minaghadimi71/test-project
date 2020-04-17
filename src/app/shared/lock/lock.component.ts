import {Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {LoadingService} from '../../loading/loading.service';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnDestroy {
  password: string;
   email: string;
   @ViewChild('loginFinishedForm', {static: false}) loginFinishedForm: NgForm;
   @Output() closeLogin = new EventEmitter();
   @Output() closeLogOut = new EventEmitter();
   copyEmail: string;
  logOut() {
    this.authService.logOut();
    this.closeLogOut.emit();
    this.router.navigate(['/auth']);
  }
  logIn() {
    this.loadingService.show();
    this.password = this.loginFinishedForm.value.password;
    this.authService.logIn(this.copyEmail, this.password).subscribe(respon => {
      this.loadingService.hide();
      this.closeLogin.emit();
    }, (errorMessage) => {
      this.loadingService.hide();
    });
  }
  constructor(private authService: AuthService,
              private loadingService: LoadingService,
              private router: Router) {
    new Promise((resolve, reject) => {
      this.authService.user.pipe(take(1)).subscribe(user => {
        if (!!user) {
          this.email = user.email;
          resolve(this.email);
        }
      });
    }).then((response) => {
      console.log(response);
      this.copyEmail = this.email;
    });
  }
ngOnDestroy(): void {
}
}
