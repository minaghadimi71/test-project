import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-life',
  templateUrl: './life-cycle.component.html',
})
export class LifeCycleComponent implements OnInit,
  OnDestroy, OnChanges, AfterViewInit, AfterContentChecked,
  AfterContentInit, AfterViewChecked, DoCheck {
  @Input('inputOfLifeCycle') inOLCycle: string;
  @ViewChild('element', {static: false}) ngOnInItFalse: ElementRef;
  @ViewChild('element', {static: true}) ngOnInItTrue: ElementRef;
  @ContentChild('content', {static: false}) contentFoodFalse: ElementRef;
  @ContentChild('content', {static: true}) contentFoodTrue: ElementRef;
  i: number = 1;
  allItems: string[] = [];

  constructor() {
    const constructorItem = 'constructor ' + this.i;
    this.allItems.push(constructorItem);
    this.i = this.i + 1;
  }

  ngOnInit(): void {
    console.log(this.ngOnInItFalse, 'false');
    console.log(this.ngOnInItTrue.nativeElement.innerText, 'true');
    const onInit = 'ngOnInit ' + this.i;
    this.allItems.push(onInit);
    this.i = this.i + 1;
    console.log(this.contentFoodFalse + ' '  + onInit);
    console.log(this.contentFoodTrue.nativeElement.textContent + ' ' + onInit);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const onChanges = 'ngOnChanges ' + this.i;
    this.allItems.push(onChanges);
    console.log(changes);
    this.i = this.i + 1;
  }

  ngOnDestroy(): void {
    const onDestroy = 'ngOnDestroy ' + this.i;
    this.allItems.push(onDestroy);
    this.i = this.i + 1;
  }

  ngAfterViewInit(): void {
    const afterViewInit = 'ngAfterViewInit ' + this.i;
    this.allItems.push(afterViewInit);
    this.i = this.i + 1;
  }

  ngAfterContentChecked(): void {
    const afterContentChecked = 'ngAfterContentChecked ' + this.i;
    this.allItems.push(afterContentChecked);
    this.i = this.i + 1;
  }

  ngAfterContentInit(): void {
    const afterContentInit = 'ngAfterContentInit ' + this.i;
    this.allItems.push(afterContentInit);
    this.i = this.i + 1;
    console.log(this.contentFoodFalse.nativeElement.textContent + ' ' + afterContentInit);
    console.log(this.contentFoodTrue.nativeElement.textContent + ' '  + afterContentInit);
  }

  ngAfterViewChecked(): void {
    const afterViewChecked = 'ngAfterViewChecked ' + this.i;
    this.allItems.push(afterViewChecked);
    this.i = this.i + 1;
  }

  ngDoCheck() {
    const doCheck = 'ngDoCheck ' + this.i;
    this.allItems.push(doCheck);
    this.i = this.i + 1;
  }
  clear() {
    this.allItems = [];
    this.i = 1;
  }
}
