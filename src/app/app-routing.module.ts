import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from './users/users.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {OuthGurd} from './outh-gurd.service';
import {PostComponent} from './post/post.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {MinaResolver} from './mina-resolver.service';
import {AuthComponent} from './auth/auth.component';
import {CommentsComponent} from './comments/comments.component';
import {ManageBookComponent} from './manage-book/manage-book.component';
import {BooksComponent} from './books/books.component';
import {ShoppingComponent} from './shopping/shopping.component';
import {AuthGuard} from './shared/auth-guard';
import {FormCandeactivateGuard} from './services/form-candeactivate-guard.service';
import {ServerComponent} from './server/server.component';
import {AuthResolver} from './services/auth-resolver.service';
import {ManageCategoryComponent} from './manage-category/manage-category.component';
import {NgxTreeComponent} from './shared/tree-view/ngx-tree.component';
import {ManageSubCategoryComponent} from './manage-category/manage-sub-category/manage-sub-category.component';
import {ModalComponent} from './shared/modale/modal.component';
import {TemplateComponent} from './form/tempelete/template.component';
import {ReactiveComponent} from './form/reactive/reactive.component';
import {FormlyComponent} from './form/formly/formly.component';
import {MaterialFormComponent} from './form/material-forms/material-form.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {NotFoundGuard} from './shared/not-found-guard';
import {TotalComponent} from './data-binding/total/total.component';
import {FormBuilder} from '@angular/forms';
import {FormBuilderComponent} from './form/form-builder/form-builder.component';
import {WareComponent} from './wars/ware.component';
import {WarsComponent} from './wars/all-wars/wars.component';
import {PaymentComponent} from './wars/payment/payment.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'reset-password', component: ResetPasswordComponent, canActivate: []},
  {path: 'posts', component: PostComponent, canActivate: [AuthGuard]},
  {path: 'template', component: TemplateComponent, canActivate: [AuthGuard]},
  {path: 'ware', component: WarsComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
  {path: 'reactive', component: ReactiveComponent, canActivate: [AuthGuard]},
  {path: 'formly', component: FormlyComponent, canActivate: [AuthGuard]},
  {path: 'builder', component: FormBuilderComponent, canActivate: [AuthGuard]},
  {path: 'material', component: MaterialFormComponent, canActivate: [AuthGuard]},
  {path: 'total', component: TotalComponent, canActivate: [AuthGuard]},
  {path: 'category', component: ManageCategoryComponent, canActivate: [AuthGuard]},
  {path: 'subCategory/:id', component: ManageSubCategoryComponent, canActivate: [AuthGuard]},
  {path: 'manageBook', component: ManageBookComponent, canDeactivate: [FormCandeactivateGuard], canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', canActivateChild: [OuthGurd, AuthGuard], component: UsersComponent, children: [
      {path: ':id', component: UserComponent, resolve: {loadUser: MinaResolver}}
    ]},
  {path: 'drag-drop', component: ShoppingComponent, canActivate: [AuthGuard]},
  {path: 'not-found', component: NotFoundComponent, data: {message: 'This page not found'}, canActivate: [AuthGuard]},
  {path: 'books', component: BooksComponent, canActivate: [AuthGuard]},
  {path: 'resolve/:id', component: ServerComponent, resolve: {server: AuthResolver}, canActivate: [AuthGuard]},
  // { path: 'home', component: HomeComponent },
  // {
  //   path: 'stores',
  //   component: StoresComponent,
  //   children: [
  //     { path: 'books', component: BooksComponent },
  //     { path: 'books/book1', component: Book1Component },
  //     { path: 'books/book2', component: Book2Component },
  //     { path: 'books/book3', component: Book3Component },
  //     { path: 'books/book4', component: Book4Component }
  //   ]
  // },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: '**', redirectTo: '/not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
