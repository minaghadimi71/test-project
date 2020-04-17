import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FoodService} from '../food.service';

export interface Food {
  type: string;
  name: string;
  id: number;
}

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {
  input: string = '';
  @Output('search') searchItem = new EventEmitter<string>();
  // @ViewChild('inputContent', {static: false}) inputContent: ElementRef;

  constructor(private foodService: FoodService) {
  }

  addDrink(someInput?: HTMLInputElement) {
    // console.log(this.inputContent.nativeElement.value);
    // console.log(someInput.value);
    // this.inputContent.nativeElement.value = 'minaaaaa';
    this.foodService.addDrink(this.input);
    this.input = '';
  }

  addFood() {
    this.foodService.addFood(this.input);
    this.input = '';
  }
  search() {
    this.searchItem.emit(this.input);
  }
}
