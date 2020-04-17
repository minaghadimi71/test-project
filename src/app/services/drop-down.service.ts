import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {exhaustMap, map, take} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {DragItems} from '../shopping/shopping.component';
import {UserForm} from '../form/form-builder/form-builder.component';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {
  private _eventLoading: Subject<boolean>;

  constructor(public http: HttpClient, private authService: AuthService) {
    this._eventLoading = new Subject<boolean>();
  }

  save() {
    this._eventLoading.next(true);
  }

  remove() {
    this._eventLoading.next(false);
  }

  on<T>(): Observable<boolean> {
    return this._eventLoading.asObservable();
  }

  saveDataSells(sells) {
    return this.http.post('https://test-mina-54de3.firebaseio.com/sell.json', sells);
  }

  fetchDataSells() {
    return this.http.get('https://test-mina-54de3.firebaseio.com/sell.json').pipe(
      map(response => {
          const responsive = [];
          for (const key in response) {
            responsive.push({...response[key]});
            // responsive.push(response[key]);
          }
          return responsive;
        }
      ));
  }

  saveDataShops(shops) {
    return this.http.post('https://test-mina-54de3.firebaseio.com/shop.json', shops);
  }

  fetchDataShops() {
    return this.http.get('https://test-mina-54de3.firebaseio.com/shop.json').pipe(
      map(response => {
          const responsive = [];
          for (const key in response) {
            responsive.push({...response[key]});
            // responsive.push(response[key]);
          }
          return responsive;
        }
      ));
  }

  exampleMethod() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get('https://test-mina-54de3.firebaseio.com/sell.json', {
        params: new HttpParams().set('auth', user.token)
      });
    }), map(response => {
        const responsive = [];
        for (const key in response) {
          responsive.push({...response[key]});
          // responsive.push(response[key]);
        }
        return responsive;
      }
    ));
  }

  returnServer(id: number) {
    const server = {name: 'server', id: id, description: 'it is very good'};
    return server;
  }

  saveDragItems(dragItems: DragItems[]): Observable<{[name: string]: string}> {
    return this.http.put<{[name: string]: string}>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/drags.json', dragItems);
  }

  getDragItems(): Observable<any> {
    return this.http.get<any>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/drags.json');
    //   .pipe(
    //   map(response => {
    //     const profileData = [];
    //     for (const key in response) {
    //       profileData.push({...response[key]});
    //     }
    //     return profileData;
    //   })
    // );
  }
}
