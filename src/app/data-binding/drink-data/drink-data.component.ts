import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Food} from '../add-data/add-data.component';
import {FoodService} from '../food.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink-data.component.html',
  styleUrls: ['./drink-data.component.css']
})
export class DrinkDataComponent {
  @Input('srcDrinks') drinks: Food;
  @Input('haveBtn') button: boolean;
  @Output('refresh') refreshData = new EventEmitter<void>();
  disable = false;
  name: string;
  constructor(public foodService: FoodService) {
  }
  saveData() {
    this.foodService.addDrinkServer(this.drinks).subscribe(
      res => {
        this.disable = true;
        this.name = res.name;
        this.refreshData.emit();
      }
    );
  }
  deleteFromServer() {
    if (this.disable) {
      this.foodService.deleteDrinkServer(this.name).subscribe(res => {
        this.foodService.deleteDrink(this.drinks.id);
        this.refreshData.emit();
      });
    } else {
      this.foodService.deleteDrink(this.drinks.id);
    }
  }
}
