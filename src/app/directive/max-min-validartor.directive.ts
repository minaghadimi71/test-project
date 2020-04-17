import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appMaxMinValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: MaxMinValidartorDirective, multi: true}
  ]
})
export class MaxMinValidartorDirective implements Validator {
  // bara reactive khoob kar nemikonad estefade shode negah kon
  @Input() minNumber: number;
  @Input() maxNumber: number;
  validate(control: AbstractControl): ValidationErrors | null {
    /* validation rules */

    /* check validation rules */
    if (control.value > this.minNumber && control.value < this.maxNumber) {
      return null;
    } else if (control.value < this.minNumber) {
      return { minValidator: true };
    } else if (control.value > this.maxNumber) {
      return { maxValidator: true };
    }
  }

}
