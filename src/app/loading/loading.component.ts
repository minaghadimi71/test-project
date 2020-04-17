import {Component} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="content"><div class="row"><div class="col-sm-12"><div class="text-center"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div></div> </div> </div>
  `,
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
}
