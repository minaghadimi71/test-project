import {Component, Input, OnChanges, OnInit} from '@angular/core';
@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit, OnChanges {
@Input() rating;
width = [];
  constructor() { }

  ngOnInit() {
  }
ngOnChanges() {
  for ( let i = 0; i < this.rating; i++) {
    this.width.push('w');
  }
}
}
