import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { StarComponent } from './star/star.component';
import { CommentsComponent } from './comments/comments.component';
import { HeaderComponent } from './header/header.component';
import { MinaDirective } from './mina.directive';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import {LoginService} from './login.service';
import {OuthGurd} from './outh-gurd.service';
import { PostComponent } from './post/post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MinaResolver} from './mina-resolver.service';
import {AlertComponent} from './shared/alert/alert.component';
import {PlaceDirective} from './shared/alert/placedirective.directive';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from './auth/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoadingComponent} from './loading/loading.component';
import {LoadingService} from './loading/loading.service';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {FilterPipe} from './pipes/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material';
import {DemoMaterialModule} from './material.module';
import {ManageBookComponent} from './manage-book/manage-book.component';
import {BooksService} from './services/books.service';
import {BooksComponent} from './books/books.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingComponent} from './shopping/shopping.component';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {DropDownService} from './services/drop-down.service';
import {AuthGuard} from './shared/auth-guard';
import {FormCandeactivateGuard} from './services/form-candeactivate-guard.service';
import {AuthResolver} from './services/auth-resolver.service';
import {ServerComponent} from './server/server.component';
import {LockComponent} from './shared/lock/lock.component';
import {TreeviewModule} from 'ngx-treeview';
import {NgxTreeComponent} from './shared/tree-view/ngx-tree.component';
import {BookService} from './shared/tree-view/book.service';
import {ManageCategoryService} from './manage-category/manage-category.service';
import {ManageCategoryComponent} from './manage-category/manage-category.component';
import {ManageSubCategoryComponent} from './manage-category/manage-sub-category/manage-sub-category.component';
import {BreadcrumbComponent} from './shared/breadcrumb/breadcrumb.component';
import {MenuService} from './services/menu.service';
import {ModalComponent} from './shared/modale/modal.component';
import {BreadCrumbsComponent} from './breadcrumbs/bread-crumbs.component';
import {BreadCrumbsService} from './breadcrumbs/bread-crumbs.service';
import {TemplateComponent} from './form/tempelete/template.component';
import {CustomNumberValidatorDirective} from './directive/custom-number-validator.directive';
import {ReactiveComponent} from './form/reactive/reactive.component';
import {FormlyComponent} from './form/formly/formly.component';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {MaterialFormComponent} from './form/material-forms/material-form.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {PassModalComponent} from './shared/pass-modal/pass-modal.component';
import {PassValidatorDirective} from './directive/pass-validator.directive';
import {ToastComponent} from './shared/toast/toast.component';
import {ToastService} from './shared/toast/toast.service';
import {MaxMinValidartorDirective} from './directive/max-min-validartor.directive';
import {NotFoundGuard} from './shared/not-found-guard';
import {AddDataComponent} from './data-binding/add-data/add-data.component';
import {TotalComponent} from './data-binding/total/total.component';
import {FoodComponent} from './data-binding/food/food.component';
import {FoodService} from './data-binding/food.service';
import {DrinkDataComponent} from './data-binding/drink-data/drink-data.component';
import {FormBuilderComponent} from './form/form-builder/form-builder.component';
import {FormService} from './form/form-builder/form.service';
import {LifeCycleComponent} from './life-cycle/life-cycle.component';
import {CustomGridComponent} from './comment/comment.component';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {PostsService} from './services/posts.service';
import {WareComponent} from './wars/ware.component';
import {WarsComponent} from './wars/all-wars/wars.component';
import {WarsService} from './wars/wars.service';
import {PaymentComponent} from './wars/payment/payment.component';
import {ExcerptPipe} from './pipes/excerpt.pipe';
import {DynamicPaginatorComponent} from './shared/dynamic-paginator/dynamic-paginator';
import {PainationServise} from './shared/dynamic-paginator/painationServise';
import {NotificationComponent} from './shared/notification/notification.component';
@NgModule({
  declarations: [
    AppComponent,
    WareComponent,
    HomeComponent,
    StarComponent,
    CommentsComponent,
    CustomGridComponent,
    HeaderComponent,
    MinaDirective,
    UsersComponent,
    UserComponent,
    PostComponent,
    NotFoundComponent,
    AlertComponent,
    PlaceDirective,
    AuthComponent,
    LoadingComponent,
    ManageBookComponent,
    BooksComponent,
    ShoppingComponent,
    FilterPipe,
    DropdownDirective,
    ServerComponent,
    LockComponent,
    NgxTreeComponent,
    ManageCategoryComponent,
    ManageSubCategoryComponent,
    BreadcrumbComponent,
    ModalComponent,
    BreadCrumbsComponent,
    TemplateComponent,
    CustomNumberValidatorDirective,
    ReactiveComponent,
    FormlyComponent,
    MaterialFormComponent,
    ResetPasswordComponent,
    PassModalComponent,
    PassValidatorDirective,
    ToastComponent,
    MaxMinValidartorDirective,
    AddDataComponent,
    TotalComponent,
    FoodComponent,
    DrinkDataComponent,
    FormBuilderComponent,
    LifeCycleComponent,
    WarsComponent,
    PaymentComponent,
    ExcerptPipe,
    DynamicPaginatorComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    DragAndDropModule,
    TreeviewModule.forRoot(),
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [LoginService, OuthGurd, AuthGuard, FormCandeactivateGuard, AuthResolver, NotFoundGuard, WarsService,
    MinaResolver, AuthService, LoadingService, FoodService,
    PostsService, BooksService, DropDownService, BookService, BreadCrumbsService,
    ManageCategoryService, MenuService, ToastService, FormService,
    PainationServise,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
    ],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent,
    LockComponent,
    ModalComponent,
    PassModalComponent,
    NotificationComponent,
    ToastComponent],
})
export class AppModule { }
