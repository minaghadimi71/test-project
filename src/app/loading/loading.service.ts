import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _eventLoading: Subject<boolean>;

  constructor() {
    this._eventLoading = new Subject<boolean>();
  }
  show() {
    this._eventLoading.next(true);
  }
  hide() {
    this._eventLoading.next(false);
  }
  on<T>(): Observable<boolean> {
    return this._eventLoading.asObservable();
  }

}
