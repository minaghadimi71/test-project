import {Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective implements OnInit {
  private flag = false;
  @HostBinding('class.open') toggleClass = this.flag;
  constructor(public renderer: Renderer2, private el: ElementRef) {
  }
  @HostListener('click') onclick() {
    this.flag = !this.flag;
    this.toggle();
  }
  ngOnInit(): void {
  }
  // toggle() {
  //   if (this.flag) {
  //     this.renderer.addClass(this.el.nativeElement, 'open');
  //   } else {
  //     this.renderer.removeClass(this.el.nativeElement, 'open');
  //   }
  // }
  toggle() {
    this.toggleClass = this.flag;
  }
}
