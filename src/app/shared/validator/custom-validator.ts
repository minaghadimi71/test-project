import {AbstractControl, FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {PostsService} from '../../services/posts.service';
import {catchError, map} from 'rxjs/operators';

export class CustomValidator {
  static staticValidator(control: FormControl): { [name: string]: boolean } {
    if (control.value === 'iran') {
      return {country: true};
    }
    return null;
  }

  static dynamicValidator(control: FormControl): Observable<any> | Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'tehran') {
          resolve({city: true});
        }
        resolve(null);
      }, 5000);
    });
    return promise;
  }
  static createValidator(registerClientService: PostsService ) {
    return (control: AbstractControl) => {
      return registerClientService.checkEmailNotTaken(control.value).pipe(
        map(isTaken => (isTaken ? {emailTaken: true} : null)),
        catchError(() => of(null))
      );
    };
  }
}
