import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Food} from '../add-data/add-data.component';
import {FoodService} from '../food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent {
  @Input('srcFood') food: Food;
  @Input('haveBtn') button: boolean;
  @Output('refresh') refreshData = new EventEmitter<void>();
  disable = false;
  name: string;
  constructor(public foodService: FoodService) {
  }
  saveData() {
    this.foodService.addFoodServer(this.food).subscribe(
      res => {
        this.disable = true;
        this.name = res.name;
        this.refreshData.emit();
      }
    );
  }
  deleteFromServer() {
    if (this.disable) {
      this.foodService.deleteFoodServer(this.name).subscribe(res => {
        this.foodService.deleteFood(this.food.id);
        this.refreshData.emit();
      });
    } else {
      this.foodService.deleteFood(this.food.id);
    }
  }
}
