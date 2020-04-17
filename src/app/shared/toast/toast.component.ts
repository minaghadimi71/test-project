import {Component} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['toast.component.css']
})
export class ToastComponent {
  header: string = '';
  body: string = '';
  color: string = '';
  constructor(private toastService: ToastService) {
    this.toastService.on().subscribe(res => {
      if (res) {
        this.header = res.head;
        this.body = res.body;
        this.color = res.color;
        document.getElementById('toast').classList.add('show');
      } else {
        document.getElementById('toast').classList.remove('show');
      }
    });
  }
}
