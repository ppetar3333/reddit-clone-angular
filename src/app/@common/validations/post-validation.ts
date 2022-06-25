import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostValidation {
  ok: boolean = false;
  displayErrorMessageTitle: boolean = false;
  titleErrorMessage: string = 'Title needs to have at least 5 characters';
  displayErrorMessageDescription: boolean = false;
  descriptionErrorMessage: string = 'Description needs to have at least 20 characters';

  showErrorDescription(value: string) {
    if (value.length < 20) {
      this.displayErrorMessageDescription = true;
      this.ok = true;
    } else {
      this.displayErrorMessageDescription = false;
      this.ok = false;
    }
  }

  showErrorTitle(value: string) {
    if (value.length < 5) {
      this.displayErrorMessageTitle = true;
      this.ok = true;
    } else {
      this.displayErrorMessageTitle = false;
      this.ok = false;
    }
  }
}
