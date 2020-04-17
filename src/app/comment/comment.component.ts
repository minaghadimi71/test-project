import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Column, Grid} from './grid';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CustomGridComponent extends DataSource<any> implements OnInit{
  displayedColumns: string[] = [];
  dataSource;
  columns: Column[];
  grid = new Grid();
  _filterChange = new BehaviorSubject('');
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('paginator', {static: false}) paginator;
  @Input() method: string;
  @Input() service;
  @Input() coll;
  constructor() {
    super();
  }
  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }
 public connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
   const searchParams = new URLSearchParams();
   searchParams.set('page', this.paginator.pageIndex + 1);
   console.log(searchParams, 'alireza');
   return of(this.paginator.pageIndex);
 }

  public disconnect(collectionViewer: CollectionViewer): void {
  }

  ngOnInit() {
    this.grid.service = this.service;
    this.grid.method = this.method;
    this.grid.columns = this.coll;
    this.grid.service[this.grid.method]().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.sort = this.sort;
        this.columns = this.grid.columns;
        this.grid.columns.map((value: Column) => {
          this.displayedColumns.push(value.prob);
        });
      }
    );

  }
  changePage() {
    console.log(this.paginator.pageIndex);
  }
}
