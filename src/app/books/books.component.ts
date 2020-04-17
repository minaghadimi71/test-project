import {Component, OnInit} from '@angular/core';
import {BooksService} from '../services/books.service';

@Component({
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
  book = [
    {prob : 'title', title: 'title'},
    {prob : 'description', title: 'description'},
    {prob : 'img', title: 'img'},
  ];
  constructor(public booksService: BooksService) {
  }
  ngOnInit(): void {
    // this.booksService.getBooks().subscribe(
    //   res => {
    //     console.log(res);
    //   }
    // );
  }
}
