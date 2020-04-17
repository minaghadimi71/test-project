import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPassValidator]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: PassValidatorDirective, multi: true}
  ]
})
export class PassValidatorDirective implements Validator {
  @Input() pass: string;
  validate(control: AbstractControl): ValidationErrors | null {
    if ((control.value && !control.value.length ) || control.value === this.pass) {
      return null;
    } else {
      return { appPassValidator: true };
    }
  }

}
