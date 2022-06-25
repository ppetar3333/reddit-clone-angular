import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validations } from 'src/app/@common/validations/register-validations';

@Component({
  selector: 'app-no-access-dialog',
  templateUrl: './no-access-dialog.component.html',
  styleUrls: ['./no-access-dialog.component.scss']
})
export class NoAccessDialogComponent implements OnInit {
  public buttonText: string = '';
  public dialogText: string = '';
  public navigateTo: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  public ngOnInit(): void {
    this.buttonText = this.data.buttonText;
    this.dialogText = this.data.dialogText;
    this.navigateTo = this.data.navigateTo;
  }
}
