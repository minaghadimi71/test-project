import {Component, OnInit} from '@angular/core';
import {TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import {BookService} from './book.service';
import {ManageCategoryService} from '../../manage-category/manage-category.service';

@Component({
  selector: 'app-tree',
  templateUrl: './ngx-tree.component.html',
  styleUrls: ['./ngx-tree.component.css']
})
export class NgxTreeComponent implements OnInit {
  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit() {
    this.items = this.bookService.getBooks();
  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }
}
