import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Post} from '../post/post.component';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PageData} from '../shared/dynamic-paginator/dynamic-paginator';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {
  }

  getPosts(param?: PageData) {
    let pageData = new HttpParams();
    if (param) {
      pageData = pageData.append('page', param.page);
      pageData = pageData.append('per_page', param.perPage);
      pageData = pageData.append('sortBy', param.sort);
    }
    console.log(pageData, 'pageData');
    return this.http.get<{ [key: string]: Post }>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/post.json', {
      params : pageData,
    }).pipe(
      map(response => {
          const responsive = [];
          for (const key in response) {
            responsive.push({...response[key], id: key});
            // responsive.push(response[key]);
          }
          return responsive;
        }
      ));
  }

  addPosts(nameUser: string,
           descriptionUser: string,
           statusUser: string,
           rowNum: number,
           dateUser: Date): Observable<{ name: string }> {
    return this.http.post<any>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/post.json',
      {
        name: nameUser,
        description: descriptionUser,
        status: statusUser,
        row: rowNum,
        date: dateUser
      }, {
        headers: new HttpHeaders({mina: 'heasghjkl'}),
        params: new HttpParams().set('param', 'custom'),
        observe: 'response'
      }).pipe(
      map(response => {
        return response.body;
      })
    );
  }
  putPost(id: string, post: Post) {
    return this.http.put<any>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/post/' + id + '.json',
      {
        name: post.name,
        description: post.description,
        status: post.status,
        row: post.row,
        date: post.date,
      });
  }

  deletePosts(id: string) {
    return this.http.delete
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/post/' + id + '.json')
      .pipe(
        catchError(
          this.handelError
        )
      );
  }

  handelError(error: HttpErrorResponse) {
    return throwError('error handel on server');
  }
  checkEmailNotTaken(value: string) {
    return this.http.post('' , value);
  }
}
