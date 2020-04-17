import {Injectable} from '@angular/core';
import {Food} from './add-data/add-data.component';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  foods: Food[] = [];
  drinks: Food[] = [];
  foodsSubject = new BehaviorSubject<Food[]>(this.foods);
  drinksSubject = new BehaviorSubject<Food[]>(this.drinks);
  constructor(public http: HttpClient) {
  }
  addFood(input: string) {
    this.foods.push({
      type: 'food',
      name: input,
      id: this.foods.length + 1,
    });
    this.foodsSubject.next(this.foods);
  }
  deleteFood(input: number) {
    const category = _.find(this.foods, (item) => item.id === input);
    const index: number = this.foods.indexOf(category);
    this.foods.splice(index, 1);
    this.foodsSubject.next(this.foods);
  }
  deleteDrink(input: number) {
    const category = _.find(this.drinks, (item) => item.id === input);
    const index: number = this.drinks.indexOf(category);
    this.drinks.splice(index, 1);
    this.drinksSubject.next(this.drinks);
  }
  deleteFoodServer(input: string) {
    return this.http.delete
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/food/' + input + '.json');
  }
  deleteDrinkServer(input: string) {
    return this.http.delete
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/drink/' + input + '.json');
  }
  addFoodServer(input: Food): Observable<{[name: string]: string}> {
    return this.http.post<{[name: string]: string}>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/food.json', {input});
  }
  addDrinkServer(input: Food): Observable<{[name: string]: string}> {
    return this.http.post<{[name: string]: string}>
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/drink.json', {input});
  }
  addDrink(input: string) {
    this.drinks.push({
      type: 'drink',
      name: input,
      id: this.drinks.length + 1,
    });
    this.drinksSubject.next(this.drinks);
  }
  getFoodsServer() {
    return this.http.get
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/food.json');
  }
  getDrinksServer() {
    return this.http.get
    ('https://rezoome-project.firebaseio.com/foods/tIcnnypTk7od5PoU3i7u/drink.json');
  }
}
