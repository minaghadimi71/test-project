// import {Component, Inject, OnInit} from "@angular/core";
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
// import {TreeItem, TreeviewConfig, TreeviewItem} from "ngx-treeview";
// import {Category, ManageCategoryService} from "../../../../services/manage-category.service";
// import * as _ from "lodash";
// import {map} from "rxjs/operators";
//
// @Component({
//   selector: 'app-manage-category-modal',
//   templateUrl: './manage-category-modal.component.html',
//   styleUrls: ['./manage-category-modal.component.scss']
// })
// export class ManageCategoryModalComponent implements OnInit {
//   public config: TreeviewConfig = TreeviewConfig.create({
//     hasAllCheckBox: false,
//     hasFilter: true,
//     hasCollapseExpand: true,
//     decoupleChildFromParent: false,
//     maxHeight: 300
//   });
//   treeView: Category[] = [];
//   items: TreeviewItem[];
//   selectedItems: Category[] = [];
//   disable = false;
//   categories: Category[] = [];
//   length: number = 0;
//   maxNumber: number;
//
//   constructor(public dialogRef: MatDialogRef<ManageCategoryModalComponent>,
//               @Inject(MAT_DIALOG_DATA) public data: number,
//               private manageCategoryService: ManageCategoryService) {
//     this.maxNumber = data;
//   }
//
//   ngOnInit(): void {
//     this.manageCategoryService.getCategories().pipe(
//       map((categories) => {
//         const treeView: TreeviewItem[] = [];
//         categories.forEach(
//           category => {
//             const subChild: TreeItem[] = [];
//             let collapsed = false;
//             if (category.children && category.children.length > 0) {
//               collapsed = true;
//             }
//             if (category.children) {
//               category.children.forEach(subCategory => {
//                 const subSubChild: TreeItem[] = [];
//                 if (subCategory.children) {
//                   subCategory.children.forEach(subSubCategory => {
//                     const subSubSubChild: TreeItem[] = [];
//                     const itemSubSubCategory = {
//                       text: subSubCategory.name,
//                       value: subSubCategory.id,
//                       checked: false,
//                       children: subSubSubChild
//                     };
//                     subSubChild.push(itemSubSubCategory);
//                   });
//                 }
//                 const itemSubCategory = {
//                   text: subCategory.name,
//                   value: subCategory.id,
//                   checked: false,
//                   children: subSubChild
//                 };
//                 subChild.push(itemSubCategory);
//               });
//               const itemCategory = new TreeviewItem(
//                 {
//                   text: category.name,
//                   value: category.id,
//                   checked: false,
//                   collapsed: !collapsed,
//                   children: subChild
//                 });
//               treeView.push(itemCategory);
//             }
//           });
//         return treeView;
//       })
//     ).subscribe(
//       (respose) => {
//         this.items = respose;
//       }
//     );
//     this.manageCategoryService.getCategories().subscribe(
//       (response) => {
//         this.categories = this.returnAllCategory(response);
//       }
//     );
//   }
//
//   closeDialogRef(): void {
//     this.dialogRef.close();
//   }
//
//   onFilterChange($event) {
//     console.log($event);
//   }
//
//   categoryPush(events: number[]) {
//     this.selectedItems = [];
//     events.forEach((event) => {
//       this.categories.forEach((item) => {
//           if (event === item.id) {
//             this.selectedItems.push(item);
//             this.getParentsOfChild(item).forEach((parent) => {
//               this.items.forEach((itemRes) => {
//                 if (itemRes.value === parent.id) {
//                   itemRes.checked = true;
//                 }
//                 if (itemRes.children) {
//                   itemRes.children.forEach(
//                     (subItem) => {
//                       if (subItem.value === parent.id) {
//                         subItem.checked = true;
//                       }
//                     }
//                   )
//                 }
//               })
//             })
//           }
//         }
//       )
//     });
//   }
//
//   removeItem(selectedItem) {
//     const index: number = this.selectedItems.indexOf(selectedItem);
//     this.selectedItems.splice(index, 1);
//     this.uncheckedItems(selectedItem.id)
//   }
//   uncheckedItems(selectedItem: number) {
//     this.disable = true;
//     this.items.forEach((item) => {
//       if (item.value === selectedItem) {
//         item.checked = false;
//         this.addItem(item);
//       }
//       if (item.children) {
//         let checkrd = false;
//         item.children.forEach(
//           (subItem) => {
//             if (subItem.value === selectedItem) {
//               subItem.checked = false;
//               this.addItem(subItem)
//             }
//             if (subItem.children) {
//               let subChecked = false;
//               subItem.children.forEach(
//                 (subSubItem) => {
//                   if (subSubItem.value === selectedItem) {
//                     subSubItem.checked = false;
//                     this.addItem(subSubItem)
//                   }
//                   if (subSubItem.checked === true) {
//                     subChecked = true;
//                   }
//                 });
//               subItem.checked = subChecked;
//             }
//             if (subItem.checked === true) {
//               checkrd = true;
//             }
//             item.checked = checkrd;
//           });
//       }
//     });
//     this.disable = false;
//   }
//
//   returnAllCategory(categories: Category[]): Category[] {
//     categories.forEach(
//       category => {
//         const itemCategory = {
//           name: category.name,
//           id: category.id,
//           parent_id: category.parent_id
//         }
//         this.treeView.push(itemCategory);
//         if (category.children) {
//           this.returnAllCategory(category.children);
//         }
//       });
//     return this.treeView;
//   }
//   getParentsOfChild(category: Category): Category[] {
//     let parent;
//     let subParent;
//     let parents = [];
//     if (category.parent_id) {
//       parent = _.find(this.categories, (item) => item.id == category.parent_id);
//       parents.push(parent);
//     }
//     if (parent.parent_id) {
//       subParent = _.find(this.categories, (item) => item.id == parent.parent_id);
//       parents.push(subParent);
//     }
//     return parents;
//   }
//   getParentOfChild(id: number) {
//     let parent;
//     const category = _.find(this.categories, (item) => item.id == id);
//     if (category.parent_id) {
//       parent = _.find(this.categories, (item) => item.id == category.parent_id);
//     }
//     return parent;
//   }
//   disableCheckbox(item) {
//     if(item.children && item.children.length > this.maxNumber) {
//       return true;
//     }
//     if(item.children && item.children.length > this.maxNumber - this.length) {
//       return true;
//     }
//   }
//   addItem(item) {
//     let lengthObject = 1;
//     if(item.children) {
//       lengthObject = item.children.length;
//       item.children.forEach((child) => {
//         if(child.children) {
//           lengthObject = lengthObject + child.children.length - 1;
//         }
//       })
//     }
//     if(item.checked === false) {
//       this.length = this.length - lengthObject;
//       this.items.forEach((item) => {
//         item.disabled = false;
//         if (item.children) {
//           item.children.forEach(
//             (subItem) => {
//               subItem.disabled = false;
//               if (subItem.children) {
//                 subItem.children.forEach(
//                   (subSubItem) => {
//                     subSubItem.disabled = false;
//                   });
//               }
//             });
//         }
//       });
//     }
//     if(item.checked === true) {
//       this.length = this.length + lengthObject;
//       if(this.length >= this.maxNumber) {
//         this.items.forEach((item) => {
//           if (!item.checked) {
//             item.disabled = true;
//           }
//           if (item.children) {
//             item.children.forEach(
//               (subItem) => {
//                 if (!subItem.checked) {
//                   subItem.disabled = true;
//                 }
//                 if (subItem.children) {
//                   subItem.children.forEach(
//                     (subSubItem) => {
//                       if (!subSubItem.checked) {
//                         subSubItem.disabled = true;
//                       }
//                     });
//                 }
//               });
//           }
//         });
//
//       }
//     }
//   }
// }
