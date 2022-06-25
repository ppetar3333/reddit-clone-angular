import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subreddit } from 'src/app/@api/models/subreddit.model';
import { SubredditService } from 'src/app/@api/services/subreddit.service';

@Component({
  selector: 'app-create-edit-rule',
  templateUrl: './create-edit-rule.component.html',
  styleUrls: ['./create-edit-rule.component.scss']
})
export class CreateEditRuleComponent implements OnInit {
  public formGroup: FormGroup;
  public subreddit: Subreddit;
  public rule: string = '';
  public editMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<CreateEditRuleComponent>,
    private subredditService: SubredditService) {
      this.subreddit = this.data.subreddit;
      this.rule = this.data.rule;
      this.editMode = this.data.editMode;
      this.formGroup = new FormGroup({
        rule: new FormControl('', Validators.required)
      })
   }

  public ngOnInit(): void {
    if(this.rule) {
      this.formGroup.setValue({ rule: this.rule });    
    }
  }

  public createNewRule(): void {
    if(this.formGroup.get('rule')?.value) {
      this.subreddit.rules?.push(this.formGroup.get('rule')?.value);
      this.subredditService.updateSubredditByID(this.subreddit, this.subreddit.subredditID).subscribe(() => {
        this.dialogRef.close();
      })
    }
  }

  public editExistingRule(): void {
    if(this.formGroup.get('rule')?.value) {
      let arr = this.subreddit.rules?.filter(data => data == this.rule);
      let newArray: string[] = [];
      this.subreddit.rules?.forEach(element1 => {
        arr?.forEach(element2 => {
          if(element1 != element2) {
            newArray.push(element1)
            newArray.push(this.formGroup.get('rule')?.value)
          }
        });
      });
      this.subreddit.rules = newArray;
      this.subredditService.updateSubredditByID(this.subreddit, this.subreddit.subredditID).subscribe(() => {
        this.dialogRef.close();
      })
    }
  }
}
