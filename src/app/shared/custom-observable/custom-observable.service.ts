import {Injectable} from '@angular/core';
import {observable, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomObservableService {
  constructor() {
  }

  observableCustom(i: number): Observable<number> {
    return Observable.create(observer => {
      let num = i;
      setInterval(() => {
          observer.next(num);
          if (num > 20) {
            observer.error(new Error('we have an error'));
          }
          if (num === 18) {
            observer.complete();
          }
          num = num + 1;
        },
        1000
      )
      ;
    });
  }

  timeObservable(i: number): Observable<number[]> {
    return Observable.create(observable => {
      let number = [];
      let flag = true;
      setInterval(() => {
        if (number.length > 12) {
          flag = false;
        }
        if (number.length < 7) {
          flag = true;
        }
        if (flag) {
          number.push(i);
        }
        if (!flag) {
          number.splice(1, 1);
        }
        observable.next(number);
        if (number.length > 22) {
          observable.complete();
        }
      }, 1000);
    });
  }

  operatorObservable(): Observable<number> {
    let i: number = 1;
    return Observable.create(observable => {
        setInterval(() => {
          observable.next(i);
          i = i + 1;
        }, 1000);
      }
    );
  }

}
