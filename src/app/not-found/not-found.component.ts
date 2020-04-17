import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {CustomObservableService} from '../shared/custom-observable/custom-observable.service';
import {Subscription} from 'rxjs';
import {filter, map, throttleTime} from 'rxjs/operators';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  message: string;
  numberServer: number;
  customObservable: Subscription;
  numberObservable: Subscription;
  operatorObservable: Subscription;
  @ViewChild('goToForm', {static: false}) goToForm: NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customObservableService: CustomObservableService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.message = data['message'];
      });
    // custom observable
    this.customObservable =
      this.customObservableService.observableCustom(5).pipe(
        filter((data) => {
          return data > 6;
        }),
        map((data) => {
          return (data + 1);
        })
      ).subscribe(
        // res => console.log(res),
        // error => alert(error.message),
        // () => console.log('completed')
      );
    this.numberObservable =
      this.customObservableService.timeObservable(3).pipe(
        filter((dataFilter) => {
          return dataFilter.length > 5;
        }),
        map((data) => {
          const mapData = [];
          data.forEach(dataItem => {
            mapData.push(dataItem + 1);
          });
          return mapData;
        })
      ).subscribe(
        // res => console.log(res),
        // error => alert(error.message),
        // () => console.log('completed')
      );
    this.operatorObservable =
      this.customObservableService.operatorObservable().pipe(
        throttleTime(2000))
        .subscribe(
        res => {
          console.log(res);
        }
      );

  }

  ngOnDestroy(): void {
    this.customObservable.unsubscribe();
    this.numberObservable.unsubscribe();
    this.operatorObservable.unsubscribe();
  }

  goToServer() {
    this.numberServer = +this.goToForm.value.numberServer;
    this.router.navigate(['/resolve', this.numberServer]);

  }

}
