import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Validations {
  ok: boolean = false;
  errorUsernameExists: boolean = false;
  displayErrorMessageUsername: boolean = false;
  displayErrorMessagePassword: boolean = false;
  displayErrorMessageRepeatPassword: boolean = false;
  displayErrorMessageEmail: boolean = false;
  emailRegex: string = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  usernameErrorMessage: string = "Username need's to be at least 5 characters";
  passwordErrorMessage: string = "Password need's to be at least 8 characters";
  passwordRepeatErrorMessage: string = "Passwords need's to match";
  emailErrorMessage: string = "Email need's to be in valid format";
  usernameExistsMessage: string = 'Username is taken';
  displayErrorMessageDisplayName: boolean = false;
  displayNameErrorMessage: string = "Display name need's to be at least 5 characters";

  showErrorUsername(value: string) {
    this.showError(value);
  }

  showError(value: string) {
    if (value.length < 5) {
      this.displayErrorMessageUsername = true;
      this.ok = true;
    } else {
      this.displayErrorMessageUsername = false;
      this.ok = false;
    }
  }

  showErrorPassowrd(value: string) {
    if (value.length < 8) {
      this.displayErrorMessagePassword = true;
      this.ok = true;
    } else {
      this.displayErrorMessagePassword = false;
      this.ok = false;
    }
  }

  showErrorDisplayName(value: string) {
    if (value.length < 5) {
      this.displayErrorMessageDisplayName = true;
      this.ok = true;
    } else {
      this.displayErrorMessageDisplayName = false;
      this.ok = false;
    }
  }

  showErrorRepeatPassowrd(repeatPassword: string, password: string) {
    if (repeatPassword !== password) {
      this.displayErrorMessageRepeatPassword = true;
      this.ok = true;
    } else {
      this.displayErrorMessageRepeatPassword = false;
      this.ok = false;
    }
  }

  showErrorEmail(value: string) {
    if (!value.match(this.emailRegex)) {
      this.displayErrorMessageEmail = true;
      this.ok = true;
    } else {
      this.displayErrorMessageEmail = false;
      this.ok = false;
    }
  }
}
