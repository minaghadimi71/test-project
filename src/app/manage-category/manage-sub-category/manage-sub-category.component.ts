import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ManageCategoryService} from '../manage-category.service';

@Component({
  templateUrl: './manage-sub-category.component.html',
})
export class ManageSubCategoryComponent implements OnInit {
  category;
  constructor(public route: ActivatedRoute, public manageCategoryService: ManageCategoryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) => {
        this.category =
          this.manageCategoryService.getCategoryById(this.manageCategoryService.getTreeCategory(), +params['id']);
      }
    );
  }
}
