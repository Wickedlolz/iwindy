import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
    return {
      email: true,
    };
  }

  return null;
}

export function passwordMatch(passwordFormControl: AbstractControl) {
  return (rePasswordFormControl: AbstractControl) => {
    if (passwordFormControl.value !== rePasswordFormControl.value) {
      return {
        passwordMath: true,
      };
    }

    return null;
  };
}
