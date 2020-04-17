import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {LoadingService} from './loading/loading.service';
import {AuthService} from './auth/auth.service';
import {fromEvent, Subscription} from 'rxjs';
import {ToastService} from './shared/toast/toast.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy{
  showLoading = false;
  userLogin: boolean = false;
  authSubscription: Subscription;
  constructor(public loadingService: LoadingService,
              public authService: AuthService,
              private toastService: ToastService) {
    this.loadingService.on().pipe(
      debounceTime(1000)
    ).subscribe(res => this.showLoading = res);
  }
  ngOnInit(): void {
    this.authService.handelAuthLogIn();
    this.authSubscription = this.authService.user.subscribe(
      response => {
        this.userLogin = !!response;
      }
    );
    const clicks = fromEvent(document, 'click');
    clicks.subscribe(res => {
      this.toastService.hide();
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
