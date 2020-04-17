import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PainationServise {
  allPage = new BehaviorSubject<number>(0);
}
