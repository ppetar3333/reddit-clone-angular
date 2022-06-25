import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubredditValidation {
  displayErrorMessageCommunityName: boolean = false;
  communityNameErrorMessage: string = 'Community name needs to have at least 5 characters';
  displayErrorMessageDescription: boolean = false;
  descriptionErrorMessage: string = 'Description needs to have at least 20 characters';
  ok: boolean = false;

  showErrorCommunityName(data: any) {
    if (data.value.length < 5) {
      this.displayErrorMessageCommunityName = true;
      this.ok = true;
    } else {
      this.displayErrorMessageCommunityName = false;
      this.ok = false;
    }
  }
  showErrorDescription(data: any) {
    if (data.value.length < 20) {
      this.displayErrorMessageDescription = true;
      this.ok = true;
    } else {
      this.displayErrorMessageDescription = false;
      this.ok = false;
    }
  }
}
