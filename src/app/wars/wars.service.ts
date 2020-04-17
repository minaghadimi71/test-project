import {Injectable} from '@angular/core';
import {Product} from './ware.component';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WarsService {
  constructor(public http: HttpClient) {
  }

  addWares(ware: Product): Observable<{ [name: string]: string }> {
    return this.http.post<{ [name: string]: string }>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/ware.json',
      ware);
  }

  putWares(ware: Product) {
    return this.http.put('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/ware/'
      + ware.fakeId + '.json',
      ware);
  }

  getWares(): Observable<Product[]> {
    return this.http.get<{ [key: string]: Product }>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/ware.json').pipe(
      map(
        data => {
          const wareData = [];
          for (const key in data) {
            wareData.push({...data[key], fakeId: key});
          }
          return wareData;
        }
      )
    );
  }
}
