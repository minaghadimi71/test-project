import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export class Country {
  name: string;
  id: number;
}

@Component({
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
  materialForm: FormGroup;
  countries: Country[] = [{
    id: 1,
    name: 'iran'
  }, {
    id: 2,
    name: 'amrica'
  }, {
    id: 3,
    name: 'afghan'
  }];
  filteredOptions: Observable<Country[]>;

  ngOnInit(): void {
    this.materialForm = new FormGroup({
      country: new FormControl(null)

    });
    this.filteredOptions = this.materialForm.get('country').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filter(value))
      );
  }

  filter(value: string) {
    const filterString = value.toLowerCase();
    return this.countries.filter(coutry => {
      coutry.name.toLowerCase().includes(filterString);
    });
  }
}
