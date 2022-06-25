import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Flair } from 'src/app/@api/models/flair.model';
import { FlairsSubreddit } from 'src/app/@api/models/flairs-subreddit.model';
import { Subreddit } from 'src/app/@api/models/subreddit.model';
import { FlairService } from 'src/app/@api/services/flair.service';
import { SubredditService } from 'src/app/@api/services/subreddit.service';

@Component({
  selector: 'app-create-edit-flair',
  templateUrl: './create-edit-flair.component.html',
  styleUrls: ['./create-edit-flair.component.scss']
})
export class CreateEditFlairComponent implements OnInit {
  public formGroup: FormGroup;
  public subreddit: Subreddit;
  public flair: string = '';
  public editMode: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<CreateEditFlairComponent>,
    private flairService: FlairService,
    private subredditService: SubredditService) {
      this.subreddit = this.data.subreddit;
      this.flair = this.data.flair;
      this.editMode = this.data.editMode;
      this.formGroup = new FormGroup({
        flair: new FormControl('', Validators.required)
      })
   }

  public ngOnInit(): void {
    if(this.flair) {
      this.formGroup.setValue({ flair: this.flair });    
    }
  }

  public createNewFlair(): void {
    if(this.formGroup.get('flair')?.value) {
      const flair = {
        "name": this.formGroup.get('flair')?.value
      }

      this.flairService.saveFlair(flair as Flair).subscribe(() => {
        this.flairService.getFlairByName(flair.name).subscribe((data) => {
          const saveFlairSubreddit = {
            "flairid": data.flairID,
            "subredditid": this.subreddit.subredditID
          }
          this.flairService.saveFlairIntoSubreddit(saveFlairSubreddit as FlairsSubreddit).subscribe(() => {});
          this.dialogRef.close({ data: flair.name});      
        })
      });
    }
  }

  public editExistingFlair(): void {
    let flairName = this.formGroup.get('flair')?.value;
    this.flairService.getFlairByName(this.flair).subscribe(data => {
      data.name = flairName;
      this.flairService.updateFlairByID(data, data.flairID).subscribe(() => {
        this.dialogRef.close({ data: flairName});
      })
    })
  }
}
