// getCategories() {
//   const dialogRef = this.dialog.open(ManageCategoryModalComponent, {
//     width: '500px',
//     data: 5,
//   });
// }
// /////////////
// import {Injectable} from "@angular/core";
// import {HttpClient} from "@angular/common/http";
// import {environment} from "../environments/environment";
// import {Observable} from "rxjs";
//
// export class Category {
//   name: string;
//   id: number;
//   parent_id: number;
//   children?: Category[];
//   checked?: boolean = false;
// }
//
// @Injectable({
//   providedIn: "root",
// })
// export class ManageCategoryService {
//   constructor(public http: HttpClient) {
//   }
//
//   getCategories(): Observable<Category[]> {
//     return this.http.get<Category[]>(environment.apiUrl + '/category');
//   }
// }
