import {FormGroup} from '@angular/forms';

export function validatePassword(formGroup: FormGroup) {
    const password = formGroup.controls.password.value;
    const confirmPassword = formGroup.controls.confirmPassword.value;

    if (confirmPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }

    return null;
}

export function validateEmail(formGroup: FormGroup) {
  const email = formGroup.controls.email.value;
  const confirmEmail = formGroup.controls.confirmEmail.value;

  if (email !== confirmEmail) {
    return {
      doesMatchEmail: true
    };
  }

  return null;
}

