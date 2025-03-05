import { FormGroup } from '@angular/forms';

export class Utilities {
  constructor() {}

  static checkValidation(form: FormGroup) {
    Object.values(form.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.markAllAsTouched();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
    return;
  }
}
