import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostsService} from '../services/posts.service';
import {debounceTime, distinctUntilChanged, map, mergeMap, pluck, reduce, scan, switchMap} from 'rxjs/operators';
import {LoadingService} from '../loading/loading.service';
import {PlaceDirective} from '../shared/alert/placedirective.directive';
import {AlertComponent} from '../shared/alert/alert.component';
import {BehaviorSubject, fromEvent, interval, of, Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {ToastService} from '../shared/toast/toast.service';
import {PageData} from '../shared/dynamic-paginator/dynamic-paginator';
import * as _ from 'lodash';
import {PainationServise} from '../shared/dynamic-paginator/painationServise';

export interface Post {
  name: string;
  status: string;
  date: Date;
  description: string;
  id: string;
  row?: number;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})

export class PostComponent implements OnInit, OnDestroy {
  searchParam = '';
  posts: Post[] = [];
  error = null;
  post: Post;
  sortable: string = 'name';
  pageNumbers: number[] = [5, 10, 15];
  @ViewChild(PlaceDirective, {static: false}) placeDirective;
  @ViewChild('serverForm', {static: false}) serverForm: NgForm;
  subscription: Subscription;
  items: number[] = [];
  copyData: PageData;
  disableDelete: boolean = false;

  constructor(private postService: PostsService,
              public loadingService: LoadingService,
              public componentFactoryResolver: ComponentFactoryResolver,
              private toastService: ToastService,
              private paginationService: PainationServise) {
  }

  ngOnInit() {
    this.promise();
    this.scanAndReduce();
    this.pluckOperator();
    this.switchMapParam();
    const input1 = document.querySelector('#name1');
    const input2 = document.querySelector('#name2');
    const input3 = document.querySelector('#name3');
    var ob1 = fromEvent(input1, 'input');
    var ob2 = fromEvent(input2, 'input');
    ob1.pipe(
      mergeMap(
        event1 => {
          const res1 = (event1.target as HTMLInputElement).value;
          return ob2.pipe(
            map(
              event2 => {
                const res2 = (event2.target as HTMLInputElement).value;
                return res1 + ' ' + res2;
              }
            )
          );
        })
    ).subscribe(
      res => {
        input3.textContent = res;
      }
    );
  }

  addPost() {
    const time = new Date();
    this.postService.addPosts(
      this.serverForm.value.name,
      this.serverForm.value.description,
      this.serverForm.value.status,
      this.posts.length + 1,
      time).subscribe(res => {
      this.getPosts(this.copyData);
      this.toastService.show('Succeed', 'Post added', 'succeed');
      this.serverForm.reset();
    });
  }

  getPosts(event: PageData) {
    this.copyData = event;
    this.loadingService.show();
    this.postService.getPosts(event).subscribe
    (response => {
        this.disableDelete = false;
        this.paginationService.allPage.next(response.length);
        this.loadingService.hide();
        this.posts = [];
        response.forEach(
          res => {
            this.posts.push(res);
          }
        );
      },
      errorResponse => {
        this.loadingService.hide();
        this.error = errorResponse.message;
        this.showError(this.error);
      });
  }

  showError(error: string) {
    const factoryComponent =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const containerRef = this.placeDirective.viewContainerRef;
    containerRef.clear();
    const viewAlert = containerRef.createComponent(factoryComponent);
    viewAlert.instance.message = error;
    this.subscription = viewAlert.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      containerRef.clear();
    });
  }

  deletePost(id: string) {
    this.disableDelete = true;
    const post = _.find(this.posts, (item) => item.id === id);
    this.postService.deletePosts(id).subscribe(
      res => {
        const promise = new Promise(resolve => {
          let i = 0;
          this.posts.forEach(itemPo => {
            if (itemPo.row > post.row) {
              itemPo.row = itemPo.row - 1;
              this.postService.putPost(itemPo.id, itemPo).subscribe(
                respon => {
                  i++;
                  if (i === this.posts.length) {
                    resolve(true);
                  }
                }
              );
            } else {
              i++;
              if (i === this.posts.length) {
                resolve(true);
              }
            }
          });
        });
        promise.then(
          (respon) => {
            this.getPosts(this.copyData);
            this.toastService.show('Succeed', 'Post deleted', 'succeed');
          }
        );
      }, errorResponse => {
        this.error = errorResponse;
        this.toastService.show('Error', this.error, 'error');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  dragEnd($event, post) {
    this.post = post;
  }

  dropItem($event, item) {
    if (this.post.row < item && this.post.row !== item - 1) {
      console.log('1');
      this.posts.map(itemPost => {
        if (itemPost.row < item && itemPost.row > this.post.row) {
          itemPost.row = itemPost.row - 1;
        }
        if (itemPost.row === item && itemPost.id !== this.post.id) {
          itemPost.row = itemPost.row - 1;
        }
      });
      this.post.row = item;
    } else if (this.post.row < item && this.post.row === item - 1) {
      console.log('2');
      this.post.row = item;
      this.posts.map(itemPost => {
        if (itemPost.row === item && itemPost.id !== this.post.id) {
          itemPost.row = itemPost.row - 1;
        }
      });
    } else if (this.post.row > item && this.post.row !== item + 1) {
      console.log('3');
      this.posts.map(itemPost => {
        if (itemPost.row > item && itemPost.row < this.post.row) {
          itemPost.row = itemPost.row + 1;
        }
        if (itemPost.row === item && itemPost.id !== this.post.id) {
          itemPost.row = itemPost.row + 1;
        }
      });
      this.post.row = item;
    } else if (this.post.row > item && this.post.row === item + 1) {
      console.log('4');
      this.post.row = item;
      this.posts.map(itemPost => {
        if (itemPost.row === item && itemPost.id !== this.post.id) {
          itemPost.row = itemPost.row + 1;
        }
      });
    }
    this.posts.forEach(postItem => {
      this.postService.putPost(postItem.id, postItem).subscribe(
        res => {
        }
      );
    });
  }

  calculateTop(post) {
    return (((post.row - 1) * 55) + 105) + 'px';
  }

  calculateZ(post) {
    if (this.post && post.id === this.post.id) {
      return 999999;
    } else {
      return 9;
    }
  }

  searching($event) {
    console.log($event.target.value);
  }

  switchMapParam() {
    const ob1 = interval(1000);
    const btn2 = document.querySelector('#btn2');
    const ob2 = fromEvent(btn2, 'click');
    ob2.pipe(
      switchMap(res => {
        return ob1;
      })
    ).subscribe(
      res => {
        console.log(res);
      }
    );
    // ob2.subscribe(
    //   res => {
    //     ob1.subscribe(respon => {
    //       console.log(respon);
    //     });
    //   }
    // );
  }

  pluckOperator() {
    const pluckItem = document.querySelector('#pluck');
    const ob1 = fromEvent(pluckItem, 'input');
    ob1.pipe(
      pluck('target', 'value'),
      // map(res => {
      //   return (res.target as HTMLInputElement).value;
      // }),
      debounceTime(2000),
      distinctUntilChanged(),
    ).subscribe((res) => {
      // const res2 = (res.target as HTMLInputElement).value;
      console.log(res);
    });
  }

  scanAndReduce() {
    const ob = of('a', 'b', 'c', 'd', 'e');
    ob.pipe(
      // scan((total, current) => {
      //   return total + current;
      // }, '0')
      reduce((total, current) => {
        return total + current;
      }, '0')
    ).subscribe(
      res => console.log(res)
    );

  }

  promise() {
    const promise = new Promise(
      (resole, reject) => {
        const item = 1 + 1;
        if (item === 2) {
          resole('areeeeee');
        } else {
          reject('naaaaaaaaaaaaaa');
        }
      });
    const promise2 = new Promise((resolve, reject) => {
      resolve('mina is good');
    });
    promise.then((message) => {
      console.log(message + 'true');
    });
    promise.catch((message) => {
      console.log(message + 'false');
    });
    Promise.all([promise, promise2]).then((message) => {
      console.log(message, 'all promise');
    });
  }

  changeSort() {
    this.getPosts({page: 1 + '', perPage: 5 + '', sort: this.sortable});
  }
}
