import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IComment} from '../comment';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public comments: IComment[] = [];
  @ViewChild('comment', {static: false}) comment: ElementRef;
  public conter = 0;

  constructor(private loginServise: LoginService) {
    // setTimeout(() => this.allowClick = true, 3000);
  }

  ngOnInit() {
  }

  // inputvared(event: Event) {
  //   console.log((<HTMLInputElement>event.target).value);
  // }
  addComment() {
    this.conter++;
    this.comments.push({
      comment: this.comment.nativeElement.value,
      star: 5,
      like: 5,
      dislike: 0,
      numberOfComment: this.conter,
    });
    console.log(this.comments);
  }

  logIn() {
    this.loginServise.onLogIn();
  }

  logOut() {
    this.loginServise.onLogOut();
  }


}
