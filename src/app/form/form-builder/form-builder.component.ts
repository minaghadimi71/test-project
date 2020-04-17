import {Component, ElementRef, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {FormService} from './form.service';
import {ToastService} from '../../shared/toast/toast.service';
import * as _ from 'lodash';
import {CustomValidator} from '../../shared/validator/custom-validator';
import {PostsService} from '../../services/posts.service';
import {MustMatch} from '../../shared/validator/must-match.validator';

export class UserForm {
  profile: { name: string, surname: string };
  animal: string;
  gender: string;
  friends: string[];
}

@Component({
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  profileForm = this.fb.group({
    name1: ['', [Validators.required]],
    surname1: ['', [Validators.required]],
    profile: this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [CustomValidator.createValidator(this.registerClientService)],
        updateOn: 'blur'
      }],
      surname: ['', Validators.required],
    }),
    animal: [''],
    animalOption: this.fb.array([]),
    animalSelector: this.fb.array([]),
    gender: ['men'],
    friends: this.fb.array([this.fb.control('', Validators.required)])
  }, {
    validators: [MustMatch('name1', 'surname1')]
  });
  animals: {
    id: number,
    name: string,
    type?: 'selector' | 'option';
  }[] =
    [{id: 1, name: 'Dog', type: 'option'},
      {id: 2, name: 'Cat', type: 'selector'},
      {id: 3, name: 'camel', type: 'option'}];
  genders = ['men', 'women'];
  users: UserForm[] = [];

  constructor(private fb: FormBuilder,
              private formService: FormService,
              private toastService: ToastService,
              private registerClientService: PostsService) {
  }

  ngOnInit(): void {
    this.getDataForm();
  }

  addFriends() {
    this.friends.push(this.fb.control('', Validators.required));
  }

  addAnimalOption() {
    this.animalOption.push(this.fb.control('', Validators.required));
  }

  addAnimalSelector() {
    this.animalSelector.push(this.fb.control('', Validators.required));
  }

  get friends() {
    return this.profileForm.get('friends') as FormArray;
  }

  get animalOption() {
    return this.profileForm.get('animalOption') as FormArray;
  }

  get animalSelector() {
    return this.profileForm.get('animalSelector') as FormArray;
  }

  removeFriend(i: number) {
    this.friends.controls.splice(i, 1);
    this.friends.value.splice(i, 1);
  }

  onsubmite() {
    this.formService.saveForm(this.profileForm.value).subscribe(
      res => {
        console.log(res);
        this.toastService.show('Succeed', 'form is submitted', 'succeed');
        this.getDataForm();

      },
      error => {
        this.toastService.show('Error', 'form is not submitted', 'error');
      }
    );
  }

  getDataForm() {
    this.formService.getForm().subscribe(
      res => {
        this.users = [];
        res.forEach(user => {
          this.users.push(user);
        });
      }
    );
  }

  selectAnimal(animal) {
    this.animalOption.clear();
    this.animalSelector.clear();
    const animalSElected = _.find(this.animals, (item) => item.id === +animal.value);
    if (animalSElected.type === 'option') {
      this.addAnimalOption();
    }
    if (animalSElected.type === 'selector') {
      this.addAnimalSelector();
    }
  }
}
