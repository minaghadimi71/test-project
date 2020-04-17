import {Injectable} from '@angular/core';
import {TreeItem, TreeviewItem} from 'ngx-treeview';
import * as _ from 'lodash';
interface Category {
  name: string;
  id: number;
  books?: Category[];
}

@Injectable({
  providedIn: 'root',
})
export class ManageCategoryService {
  public categorys: Category[];
  treeview: TreeItem[] = [];
  constructor() {
    this.categorys = this.getCategory();
  }
  getCategory(): Category[] {
    const categorys: Category[] =
      [
        {
          name: 'a', id: 1, books:
            [
              {
                name: 'b', id: 2, books:
                  [
                    {name: 'c', id: 3}, {
                    name: 'd', id: 4, books:
                      [
                        {name: 'e', id: 5}, {
                        name: 'f', id: 6, books:
                          [
                            {name: 'g', id: 7}, {name: 'h', id: 8}
                          ]
                      }
                        , {
                        name: 'i', id: 9, books:
                          [
                            {name: 'j', id: 10}, {name: 'k', id: 11}
                          ]
                      }
                      ]
                  }
                  ]
              }
            ]
        }, {
        name: 'l', id: 12, books:
          [
            {
              name: 'm', id: 13, books:
                [
                  {name: 'n', id: 14}, {
                  name: 'o', id: 15, books:
                    [
                      {name: 'p', id: 17}, {
                      name: 'q', id: 16, books:
                        [
                          {name: 'r', id: 18}, {name: 's', id: 19}
                        ]
                    }
                      , {
                      name: 't', id: 20, books:
                        [
                          {name: 'u', id: 21}, {name: 'e', id: 22}, {name: 'w', id: 23}
                        ]
                    }
                    ]
                }
                ]
            }
          ],
      }, {name: 'x', id: 24}, {name: 'y', id: 25}, {name: 'z', id: 26}
      ];
    return categorys;
  }
  getTreeCategory(): Category[] {
    const categorys: Category[] =
      [ {
        name: 'one', id: 1, books:
          [
            {
              name: 'two', id: 2, books:
                [
                  {name: 'tree', id: 3},
                  {name: 'four', id: 4}
                ]
            },
            {
              name: 'five', id: 5, books:
                [
                  {name: 'six', id: 6},
                  {name: 'seven', id: 7}
                ]
            }
          ]
      }, {
        name: 'eight', id: 8, books:
          [
            {
              name: 'nine', id: 9, books:
                [
                  {name: 'ten', id: 10},
                  {name: 'two-eleven', id: 12},
                  {name: 'eleven', id: 11}
                ]
            }
          ]
      }, {
        name: 'tree-eleven', id: 13, books:
          [
            {
              name: 'four-el', id: 14, books:
                [
                  {name: 'five-el', id: 15}
                ]
            }
          ]
      }, {
        name: 'six-el', id: 16, books:
          [
            {
              name: 'seven-el', id: 17, books:
                [
                  {name: 'eight-el', id: 18},
                  {name: 'nine-el', id: 19}
                ]
            }
          ]
      },
        {
          name: 'a', id: 20, books:
            [
              {
                name: 'b', id: 21, books:
                  [
                    {name: 'c', id: 23},
                    {name: 'd', id: 24}
                  ]
              }
            ]
        }, {
        name: 'l', id: 22, books:
          [
            {
              name: 'm', id: 25, books:
                [
                  {name: 'n', id: 26}, {
                  name: 'o', id: 27}
                ]
            }
          ],
      }, {name: 'x', id: 31}, {name: 'y', id: 32}, {name: 'z', id: 33}
      ];
    return categorys;
  }
  returnNgxTree(categorys: Category[]): TreeviewItem[] {
    const treeview: TreeviewItem[] = [];
    categorys.forEach(
      category => {
        const subChild: TreeItem[] = [];
        let colapsed = false;
        if (category.books && category.books.length > 0) {
          colapsed = true;
        }
        if (category.books) {
          category.books.forEach(subCategory => {
            const subSubChild: TreeItem[] = [];
            if (subCategory.books) {
              subCategory.books.forEach(subSubCategory => {
                const subSubSubChild: TreeItem[] = [];
                if (subSubCategory.books) {
                  subSubCategory.books.forEach(subSubSubCategory => {
                    const lastChild: TreeItem[] = [];
                    if (subSubSubCategory.books) {
                      subSubSubCategory.books.forEach(lastCategory => {
                    const itemLastCategory = {
                      text: lastCategory.name,
                      value: lastCategory.id,
                    };
                    lastChild.push(itemLastCategory);
                  });
                }
                    const itemSubSubSubCategory = {
                      text: subSubSubCategory.name,
                      value: subSubSubCategory.id,
                      children: lastChild
                    };
                    subSubSubChild.push(itemSubSubSubCategory);
                  });
                }
                const itemSubSubCategory = {
                  text: subSubCategory.name,
                  value: subSubCategory.id,
                  children: subSubSubChild
                };
                subSubChild.push(itemSubSubCategory);
              });
            }
            const itemSubCategory = {
              text: subCategory.name,
              value: subCategory.id,
              children: subSubChild
            };
            subChild.push(itemSubCategory);
          });
        }
        const itemCategory = new TreeviewItem(
          {
            text: category.name,
            value: category.id,
            collapsed: !colapsed,
            children: subChild
          });
        treeview.push(itemCategory);
      });
    return treeview;
  }
  returnNgxTreeForTree(categorys: Category[]): TreeviewItem[] {
    const treeview: TreeviewItem[] = [];
    categorys.forEach(
      category => {
        const subChild: TreeItem[] = [];
        let colapsed = false;
        if (category.books && category.books.length > 0) {
          colapsed = true;
        }
        if (category.books) {
          category.books.forEach(subCategory => {
            const subSubChild: TreeItem[] = [];
            if (subCategory.books) {
              subCategory.books.forEach(subSubCategory => {
                const subSubSubChild: TreeItem[] = [];
                const itemSubSubCategory = {
                  text: subSubCategory.name,
                  value: subSubCategory.id,
                  children: subSubSubChild
                };
                subSubChild.push(itemSubSubCategory);
              });
            }
            const itemSubCategory = {
              text: subCategory.name,
              value: subCategory.id,
              children: subSubChild
            };
            subChild.push(itemSubCategory);
          });
          const itemCategory = new TreeviewItem(
            {
              text: category.name,
              value: category.id,
              collapsed: !colapsed,
              children: subChild
            });
          treeview.push(itemCategory);
        }
      });
    return treeview;
  }
  returnNgxTreeItemsbinahayat(categorys: Category[]): TreeItem[] {
    categorys.forEach(
      category => {
        const itemCategory = {
          text: category.name,
          value: category.id,
        }
        this.treeview.push(itemCategory);
        if (category.books) {
          this.returnNgxTreeItemsbinahayat(category.books);
        }
      });
    return this.treeview;
  }
  getCategoryById(categorys: Category[], id: number): TreeItem[] {
    const items = this.returnNgxTreeItemsbinahayat(categorys);
    const tmpHero = _.find(items, (item) => item.value == id);
    return tmpHero;
  }
}




// returnNgxTreeItems(): TreeItem[] {
//   const treeview: TreeItem[] = [];
//   this.getCategory().forEach(
//     category => {
//       const itemCategory = {
//         text: category.name,
//         value: category.id,
//       }
//       treeview.push(itemCategory);
//       if (category.books) {
//         category.books.forEach(subCategory => {
//           const itemSubCategory = {
//             text: subCategory.name,
//             value: subCategory.id,
//           };
//           treeview.push(itemSubCategory);
//           if (subCategory.books) {
//             subCategory.books.forEach(subSubCategory => {
//               const itemSubSubCategory = {
//                 text: subSubCategory.name,
//                 value: subSubCategory.id,
//               };
//               treeview.push(itemSubSubCategory);
//               if (subSubCategory.books) {
//                 subSubCategory.books.forEach(subSubSubCategory => {
//                   const itemSubSubSubCategory = {
//                     text: subSubSubCategory.name,
//                     value: subSubSubCategory.id,
//                   };
//                   treeview.push(itemSubSubSubCategory);
//                   if (subSubSubCategory.books) {
//                     subSubSubCategory.books.forEach(subSubSubSubCategory => {
//                       const itemSubSubSubSubCategory = {
//                         text: subSubSubSubCategory.name,
//                         value: subSubSubSubCategory.id,
//                       };
//                       treeview.push(itemSubSubSubSubCategory);
//                     });
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });
//   return treeview;
// }
// returnNgxTree(): TreeviewItem[] {
//   const treeview: TreeviewItem[] = [];
//   this.getCategory().forEach(
//     category => {
//       const subChild: TreeItem[] = [];
//       let colapsed = false;
//       if (category.books && category.books.length > 0) {
//         colapsed = true;
//       }
//       if (category.books) {
//         category.books.forEach(subCategory => {
//           const subSubChild: TreeItem[] = [];
//           if (subCategory.books) {
//             subCategory.books.forEach(subSubCategory => {
//               const subSubSubChild: TreeItem[] = [];
//               if (subSubCategory.books) {
//                 subSubCategory.books.forEach(subSubSubCategory => {
//                   const lastChild: TreeItem[] = [];
//                   if (subSubSubCategory.books) {
//                     subSubSubCategory.books.forEach(lastCategory => {
//                       const itemLastCategory = {
//                         text: lastCategory.name,
//                         value: lastCategory.id,
//                       };
//                       lastChild.push(itemLastCategory);
//                     });
//                   }
//                   const itemSubSubSubCategory = {
//                     text: subSubSubCategory.name,
//                     value: subSubSubCategory.id,
//                     children: lastChild
//                   };
//                   subSubSubChild.push(itemSubSubSubCategory);
//                 });
//               }
//               const itemSubSubCategory = {
//                 text: subSubCategory.name,
//                 value: subSubCategory.id,
//                 children: subSubSubChild
//               };
//               subSubChild.push(itemSubSubCategory);
//             });
//           }
//           const itemSubCategory = {
//             text: subCategory.name,
//             value: subCategory.id,
//             children: subSubChild
//           };
//           subChild.push(itemSubCategory);
//         });
//       }
//       const itemCategory = new TreeviewItem(
//         {
//           text: category.name,
//           value: category.id,
//           collapsed: !colapsed,
//           children: subChild
//         });
//       treeview.push(itemCategory);
//     });
//   return treeview;
// }
