import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  // public comments = [];
  // @ViewChild('comment', {static: false}) commentAdd: ElementRef;
  mina = [
    {prob : 'position', title: 'position'},
    {prob : 'name', title: 'name'},
    {prob : 'weight', title: 'weight'},
    {prob : 'symbol', title: 'symbol'},
  ];
  met = 'getDataone';
  constructor() { }

  ngOnInit() {
  }
  // addComment() {
  //   this.comments.push(this.commentAdd.nativeElement.value);
  //   console.log(this.comments);
  //
  // }

}
