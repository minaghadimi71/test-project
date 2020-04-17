import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../services/books.service';
import {Router} from '@angular/router';
import {FormCandeactivateComponent} from '../services/form-candeactivate-guard.service';
import {Book} from '../models/book';
import {BsModalService} from 'ngx-bootstrap';
import {ModalComponent} from '../shared/modale/modal.component';
import {interval, merge, of, Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {NotificationComponent, Notification} from '../shared/notification/notification.component';
import {ManageCategoryService} from '../manage-category/manage-category.service';
import {delay, exhaustMap, switchMap, take} from 'rxjs/operators';

@Component({
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit, FormCandeactivateComponent, OnDestroy {
  profileBook;
  public imgUrl;
  submitted = false;
  categories;
  country: {name: string, id: number}[] = [{name: 'iran', id: 1},
    {name: 'turki', id: 2}];
  userNotifications: Notification[] = [];
  notificationFlag: boolean = false;
  constructor(public booksService: BooksService,
              public route: Router,
              private modalService: BsModalService,
              public dialog: MatDialog,
              public categoryService: ManageCategoryService) {
    this.booksService.getNotification().subscribe(
      res => {
       this.userNotifications = res;
       console.log(res);
      }
    );
  }

  ngOnInit(): void {
    this.profileBook = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      img: new FormControl(''),

    });
    this.categories = this.categoryService.getTreeCategory();
    console.log(this.categories);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.profileBook.value);
    const book: Book = this.profileBook.value;
    this.booksService.addBook(book).pipe(
      switchMap(res => {
        return this.booksService.deleteNotification().pipe(
          switchMap( respo => {
              return this.booksService.addNotification(this.userNotifications);
            }
          )
        );
      })
    ).subscribe(
      res => {
        this.route.navigate(['/books']);
      }
    );
  }

  navigate() {
    this.route.navigate(['/books']);
  }

  canDeactivate() {
    if (this.profileBook.dirty && !this.submitted ||
      this.notificationFlag && !this.submitted) {
      const subject = new Subject<boolean>();
      const modal = this.modalService.show(ModalComponent);
      modal.content.title = 'CanDeactivate modal';
      modal.content.message = 'are you sure?';
      modal.content.yesButton = 'Yes';
      modal.content.noButton = 'No';
      modal.content.subject = subject;
      return subject.asObservable();
      // return confirm('are you sure?');
    }
    return true;
  }
  openAddNotification() {
    const dialogRef = this.dialog.open(NotificationComponent, {
      maxWidth: '600px',
      data: {
        max: 5,
        allCategories:  this.categories,
        countries: this.country,
        callback: (notification) => {
          console.log(notification, 'notification');
          this.notificationFlag = true;
          this.userNotifications.push(notification);
          dialogRef.close();
        }
      },
    });
  }
  ngOnDestroy(): void {
  }
  remove(i) {
    console.log(',,,,,,,,,,,,,,,,');
    const index = this.userNotifications.indexOf(i);
    this.userNotifications.splice(index, 1);
    this.notificationFlag = true;
  }
  ex() {
    const sourceInterval = interval(1000);
    const delayedInterval = sourceInterval.pipe(delay(10), take(4));

    const exhaustSub = merge(
      // delay 10ms, then start interval emitting 4 values
      delayedInterval,
      // emit immediately
      of(true)
    )
      .pipe(exhaustMap(_ => sourceInterval.pipe(take(5))))
      /*
       *  The first emitted value (of(true)) will be mapped
       *  to an interval observable emitting 1 value every
       *  second, completing after 5.
       *  Because the emissions from the delayed interval
       *  fall while this observable is still active they will be ignored.
       *
       *  Contrast this with concatMap which would queue,
       *  switchMap which would switch to a new inner observable each emission,
       *  and mergeMap which would maintain a new subscription for each emitted value.
       */
      // output: 0, 1, 2, 3, 4
      .subscribe(val => console.log(val));
  }
}
