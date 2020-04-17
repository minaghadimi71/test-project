import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {fromEvent, interval, observable, Subscription} from 'rxjs';

import {PlaceDirective} from '../shared/alert/placedirective.directive';
import {LockComponent} from '../shared/lock/lock.component';
import {AuthService} from '../auth/auth.service';

@Component({
  templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit, OnDestroy {
  serverParam;
  intervalParam: Subscription;
  private subscribeLogIn: Subscription;
  private subscribeLogOut: Subscription;
  private events: Subscription[] = [];
  timeOut: number;
  eventObserver;
  @ViewChild(PlaceDirective,
    {static: false}) alertHost: PlaceDirective;

  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private authService: AuthService) {
    const clicks = fromEvent(document, 'click');
    const mousemove = fromEvent(document, 'mousemove');
    const keyup = fromEvent(document, 'keyup');
    this.eventObserver = [clicks, mousemove, keyup];
    this.eventObserver.forEach((obser) => {
      this.events.push(obser.subscribe((x) => {
        this.intervalParam.unsubscribe();
        this.intervalParam =
          interval(60000 * this.timeOut).subscribe(res => {
            console.log('show erroe');
            this.showError();
          });
      }));
    });

  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.serverParam = data['server'];
      this.timeOut = +this.serverParam.id;
    });
    this.intervalParam =
      interval(60000 * this.timeOut).subscribe(res => {
        console.log('show erroe');
        this.showError();
      });
  }

  showError() {
    console.log('daram ejra misham');
    this.intervalParam.unsubscribe();
    this.events.forEach(even => {
      even.unsubscribe();
    });
    const factoryLock =
      this.componentFactoryResolver.resolveComponentFactory(LockComponent);
    const hostViewContainerRef =
      this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef =
      hostViewContainerRef.createComponent(factoryLock);
    this.authService.logOut();
    this.subscribeLogIn =
      componentRef.instance.closeLogin.subscribe(
        () => {
          this.subscribeLogIn.unsubscribe();
          hostViewContainerRef.clear();
          this.eventObserver.forEach((obser) => {
            this.events.push(obser.subscribe((x) => {
              this.intervalParam.unsubscribe();
              this.intervalParam =
                interval(60000 * this.timeOut).subscribe(res => {
                  console.log('show erroe');
                  this.showError();
                });
            }));
          });
        }
      );
    this.subscribeLogOut =
      componentRef.instance.closeLogOut.subscribe(
        () => {
          this.subscribeLogIn.unsubscribe();
          hostViewContainerRef.clear();
          this.events.forEach(even => {
            even.unsubscribe();
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.intervalParam.unsubscribe();
    if (this.subscribeLogOut) {
      this.subscribeLogOut.unsubscribe();
    }
    if (this.subscribeLogIn) {
      this.subscribeLogIn.unsubscribe();
    }
    this.events.forEach(even => {
      even.unsubscribe();
    });
  }
}
