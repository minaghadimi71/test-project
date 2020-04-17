import {AfterContentChecked, AfterContentInit, Component, ContentChild, OnInit} from '@angular/core';
import {Food} from '../add-data/add-data.component';
import {FoodService} from '../food.service';

@Component({
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit{
  foods: Food[] = [];
  drinks: Food[] = [];
  serverFoods: Food[];
  serverDrinks: Food[];
  getDataFood = false;
  getDataDrinks = false;
  inputOfLifeCycle: string = '';
  constructor(private foodService: FoodService) {
    const promiseFood = new Promise((resolve, reject) => {
      this.foodService.getFoodsServer().subscribe(
        res => {
          this.serverFoods = [];
          for (const key in res) {
            this.serverFoods.push(res[key].input);
          }
          resolve(this.serverFoods.length);
        }
      );
    }).then(res => {
      if (res > 0) {
        this.getDataFood = true;
      }
    });
    const promiseDrink = new Promise((resolve, reject) => {
      this.foodService.getDrinksServer().subscribe(
        res => {
          this.serverDrinks = [];
          for (const key in res) {
            this.serverDrinks.push(res[key].input);
          }
          resolve(this.serverDrinks.length);
        });
    }).then(res => {
      if (res > 0) {
        this.getDataDrinks = true;
      }
    });
  }

  ngOnInit(): void {
    this.foodService.foodsSubject.subscribe(
      res => {
        this.foods = res;
      }
    );
    this.foodService.drinksSubject.subscribe(
      res => {
        this.drinks = res;
      }
    );
  }

  refreshDrink() {
    this.foodService.getDrinksServer().subscribe(
      res => {
        this.getDataDrinks = false;
        this.serverDrinks = [];
        for (const key in res) {
          this.serverDrinks.push(res[key].input);
        }
        if (this.serverDrinks.length > 0) {
          this.getDataDrinks = true;
        }
      }
    );
  }

  refreshFood() {
    this.foodService.getFoodsServer().subscribe(
      res => {
        this.getDataFood = false;
        this.serverFoods = [];
        for (const key in res) {
          this.serverFoods.push(res[key].input);
        }
        if (this.serverFoods.length > 0) {
          this.getDataFood = true;
        }
      }
    );
  }

  add($event) {
    this.inputOfLifeCycle = $event;
  }
}
