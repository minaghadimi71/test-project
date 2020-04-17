import {HttpEventType, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {exhaustMap, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      }), tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log('it is response');
        }
      })
    );
  }
}
// ex() {
//   const firstInterval = interval(1000).pipe(take(10));
//   const secondInterval = interval(1000).pipe(take(2));
//
//   const exhaustSub = firstInterval
//     .pipe(
//       exhaustMap(f => {
//         console.log(`Emission Corrected of first interval: ${f}`);
//         return secondInterval;
//       })
//     ).subscribe(s => console.log(s));
// }
