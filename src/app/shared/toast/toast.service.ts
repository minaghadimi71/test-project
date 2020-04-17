import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

export interface ToastData {
  head: string;
  body: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasterData: Subject<ToastData>;
constructor() {
  this.toasterData = new Subject<ToastData>();
}
  show(headData: string, bodyData: string, colorData: string) {
    this.toasterData.next({head: headData, body: bodyData, color: colorData});
  }

  hide() {
    this.toasterData.next(null);
  }
  on<T>(): Observable<ToastData> {
    return this.toasterData.asObservable();
  }
}
