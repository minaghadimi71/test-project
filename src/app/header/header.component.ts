import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DropDownService} from '../services/drop-down.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceDirective} from '../shared/alert/placedirective.directive';
import {PassModalComponent} from '../shared/pass-modal/pass-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public email: string = 'minaghadimi71@gmail.com';
  public authSubscription: Subscription;
  public isMobile = false;
  private subscribe: Subscription;
  @ViewChild(PlaceDirective, {static: false}) alertHost: PlaceDirective;

  constructor(public dropDownService: DropDownService,
              private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
    if (window.innerWidth < 991) {
      this.isMobile = true;
    }
  }

  ngOnInit() {
    this.authSubscription = this.authService.user.subscribe(res => {
      if (!!res) {
        this.email = res.email;
      }
    });
  }

  saveData() {
    this.dropDownService.save();
  }

  removeData() {
    this.dropDownService.remove();
  }
  logOutUser() {
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }
  changePassword() {
    const factoryAlert = this.componentFactoryResolver.resolveComponentFactory(PassModalComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(factoryAlert);
    this.subscribe = componentRef.instance.close.subscribe(
      () => {
        this.subscribe.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    this.authSubscription.unsubscribe();
  }
}
