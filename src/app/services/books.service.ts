import {HttpClient} from '@angular/common/http';
import {Book} from '../models/book';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Notification} from '../shared/notification/notification.component';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(public http: HttpClient) {
  }
  addBook(book: Book): Observable<{[name: string]: string}> {
    return this.http.post<{[name: string]: string}>('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/book.json', book);
  }
  addNotification(notification: Notification[]) {
    return this.http.post<{[name: string]: string}>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/notification.json', notification);
  }
  deleteNotification() {
    return this.http.delete
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/notification.json');
  }
  getNotification() {
    return this.http.get
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/notification.json').pipe(
      map(response => {
          const responsive = [];
          for (const key in response) {
            responsive.push(response[key][0]);
          }
          return responsive;
        }
      )
    );
  }
  getBooks() {
    return this.http.get('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/book.json').pipe(
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
}
