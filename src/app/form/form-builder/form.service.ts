import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserForm} from './form-builder.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {
  }

  saveForm(form: UserForm): Observable<{ [name: string]: string }> {
    return this.http.post<{ [name: string]: string }>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/form.json', form);
  }

  getForm(): Observable<UserForm[]> {
    return this.http.get<{ [key: string]: UserForm }>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/form.json').pipe(
      map(
        data => {
          const profileData = [];
          for (const key in data) {
            profileData.push({...data[key]});
            // profileData.push(data[key]);
          }
          return profileData;
        }
      )
    );
  }
}
