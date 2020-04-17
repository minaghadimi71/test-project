import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {LoadingService} from '../loading/loading.service';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceDirective} from '../shared/alert/placedirective.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogIn = true;
  error = null;
  private subscribe: Subscription;
  @ViewChild(PlaceDirective, {static: false}) alertHost: PlaceDirective;
  constructor(public authService: AuthService,
              public loadingService: LoadingService,
              public router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
  submitted(formAuth: NgForm) {
    this.error = null;
    this.loadingService.show();
    let auth: Observable<AuthResponseData>;
    if (!this.isLogIn) {
      auth = this.authService.register(formAuth.value.email, formAuth.value.password);
    } else {
      auth = this.authService.logIn(formAuth.value.email, formAuth.value.password);
    }
     auth.subscribe(
      res => {
        formAuth.onReset();
        this.router.navigate(['/drag-drop']);
        this.loadingService.hide();
      },
      (errorMessage) => {
        formAuth.onReset();
        this.error = errorMessage;
        this.showError(errorMessage);
        this.loadingService.hide();
      }
    );
  }
  switch() {
    this.isLogIn = !this.isLogIn;
  }
  // closeAlert() {
  //   this.error = null;
  // }
  showError(message: string) {
    const factoryAlert = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(factoryAlert);
    componentRef.instance.message = message;
    componentRef.instance.title = 'Error';
    this.subscribe = componentRef.instance.close.subscribe(
      () => {
        this.subscribe.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
  goToResetPass() {
    this.router.navigate(['./reset-password']);
  }
}
