import {Component} from '@angular/core';
export interface Icrumbs {
  text: string;
  path: string;
}
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent {
  crumbs: Icrumbs[] = [{text: 'mina', path: 'mina2'}, {text: 'mina', path: 'mina2'}];
}
