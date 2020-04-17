import {Component, OnInit} from '@angular/core';
import {ManageCategoryService} from './manage-category.service';
import {TreeItem, TreeviewConfig, TreeviewItem} from 'ngx-treeview';
import * as _ from 'lodash';

@Component({
  selector: 'app-category',
  templateUrl: './manage-category.component.html'
})
export class ManageCategoryComponent implements OnInit {
  public config: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });
  items: TreeviewItem[];
  lastItems: TreeItem[];
  selectedItems: TreeItem[] = [];
  disable = false;

  constructor(private manageCategoryService: ManageCategoryService) {
  }

  ngOnInit(): void {
    this.items = this.manageCategoryService.returnNgxTreeForTree
    (this.manageCategoryService.getTreeCategory());
    this.lastItems = this.manageCategoryService.returnNgxTreeItemsbinahayat(
      this.manageCategoryService.getTreeCategory());
    console.log(this.lastItems);
    const tmpHero = _.find(this.lastItems, (hero) => hero.value == 5);
    console.log(tmpHero);
  }

  onFilterChange($event) {
    console.log($event);
  }

  categoryPush(events) {
    console.log(events);
    this.selectedItems = [];
    events.forEach((even) => {
      this.lastItems.forEach((item) => {
        if (even == item.value) {
          this.selectedItems.push(item);
        }
      });
    });
  }

  removeItem(selectedItem) {

    this.uncheckedItems(selectedItem.value);

  }

  uncheckedItems(selectedItem: number) {
    this.disable = true;
    this.items.forEach((item) => {
      if (item.value === selectedItem) {
        item.checked = false;
      }
      if (item.children) {
        item.children.forEach(
          (subItem) => {
            if (subItem.value === selectedItem) {
              subItem.checked = false;
            }
            if (subItem.children) {
              let subChecked = false;
              subItem.children.forEach(
                (subSubItem) => {
                  if (subSubItem.value === selectedItem) {
                    subSubItem.checked = false;
                  }
                  if (subSubItem.checked === true) {
                    subChecked = true;
                  }
                });
              subItem.checked = subChecked;
            }
            let checkrd = false;
            if (subItem.checked === true) {
              checkrd = true;
            }
            item.checked = checkrd;
          });
      }
    });
    this.disable = false;
  }
}
