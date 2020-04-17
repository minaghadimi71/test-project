import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {ToastData} from '../shared/toast/toast.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
export const environment = {
  apiUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:',
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = new BehaviorSubject<User>(null);
  private expireTime: any;
  private pageData = new HttpParams();

  constructor(private http: HttpClient, private router: Router) {
    this.pageData = this.pageData.append('key', 'AIzaSyDvdrwN5VBdFzqsB8iPpCdGlJQLfWcCFuk');
  }

  register(email: string, password: string) {
    return this.http.post<AuthResponseData>
    (environment.apiUrl + 'signUp?' + this.pageData,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handelError),
      tap(res => {
          this.handelAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }
      ));
  }

  logIn(email: string, password: string) {
    return this.http.post<AuthResponseData>
    (environment.apiUrl + 'signInWithPassword?' + this.pageData,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handelError),
      tap(res => {
          this.handelAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }
      ));
  }

  logOut() {
    this.user.next(null);
    localStorage.clear();
    clearTimeout(this.expireTime);
  }
  handelAuthentication(email: string, id: string, token: string, expire: number) {
    const expireDate = new Date(new Date().getTime() + expire * 1000);
    const authUser = new User(email, id, token, expireDate);
    this.user.next(authUser);
    this.autoLogOut(expire * 1000);
    localStorage.setItem('userData', JSON.stringify(authUser));
  }
  autoLogOut(expireDate: number) {
    this.expireTime = setTimeout(() => {
      this.logOut();
      this.router.navigate(['/auth']);
    }, expireDate);
  }

  resetPassword(email: string) {
    return this.http.post(environment.apiUrl + 'sendOobCode?' + this.pageData,
      {
        requestType: 'PASSWORD_RESET',
        email: email,
      });

  }

  changePassword(newPass) {
    let token: string;
    token = JSON.parse(localStorage.getItem('userData'))._token;
    // tslint:disable-next-line:max-line-length
    return this.http.post<AuthResponseData>(environment.apiUrl + 'update?' + this.pageData,
      {
        idToken: token,
        password: newPass,
        returnSecureToken: true,
      }).pipe(tap(res => {
          console.log(res.expiresIn);
          this.handelAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
        }
      ));
  }

  handelAuthLogIn() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _expireDate: string,
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const user = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._expireDate));
    if (user.token) {
      this.user.next(user);
      const expireTime = new Date(userData._expireDate).getTime() - new Date().getTime();
      this.autoLogOut(expireTime);
    }
  }
  handelError(error: HttpErrorResponse) {
    let errorMessage = 'error not understand';
    if (!error.error || !error.error.error) {
      return throwError(errorMessage);
    }
    switch (error.error.error.message) {
      case 'EMAIL_NOT_FOUND' :
        errorMessage = 'email or pass is not valid';
        break;
      case 'EMAIL_EXISTS' :
        errorMessage = 'email is exist';
        break;
      case 'INVALID_PASSWORD' :
        errorMessage = 'password is incorrect';
        break;
    }
    return throwError(errorMessage);
  }
}
