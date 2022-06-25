import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { Subreddit } from 'src/app/@api/models/subreddit.model';
import { User } from 'src/app/@api/models/user.model';
import { FlairService } from 'src/app/@api/services/flair.service';
import { SubredditService } from 'src/app/@api/services/subreddit.service';
import { CreateEditFlairComponent } from './create-edit-flair/create-edit-flair.component';

@Component({
  selector: 'app-change-flair',
  templateUrl: './change-flair.component.html',
  styleUrls: ['./change-flair.component.scss']
})
export class ChangeFlairComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public collectionForm = new FormGroup({ filter: new FormControl('') });
  public displayedColumns: string[] = ['Flair', 'Remove', 'Edit'];
  public dataSource = new MatTableDataSource<String>();
  public loggedInUser!: User;
  public subredditId: number;
  public subreddit!: Subreddit;
  public subredditFlairs: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private flairService: FlairService,
    private authService: AuthService,
    private dialog: MatDialog,
    private subredditService: SubredditService
  ) { 
    this.subredditId = this.activatedRoute.snapshot.params['subredditID'];
    this.authService.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }

  public ngOnInit(): void {
    this.getSubreddit();
    this.setupDataSource();
  }

  private setupDataSource() {
    this.flairService.getFlairsBySubredditId(this.subredditId).subscribe((data) => {
      data.forEach(element => {
        this.flairService.getFlairByID(element.flairid).subscribe((data) => {
          this.subredditFlairs.push(data.name);
          this.dataSource.data = this.subredditFlairs;
          if(this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        })
      });
    })
  }

  public getSubreddit(): void {
    this.subredditService.getSubredditByID(this.subredditId).subscribe((data) => { 
      this.subreddit = data;
    });
  }

  public removeFlair(flair: string) {
    this.flairService.deleteFlairByName(this.subredditId, flair).subscribe(() => {});
    this.subredditFlairs = this.subredditFlairs.filter(data => data != flair);
    this.dataSource.data = this.subredditFlairs;
  }

  public editFlair(flair: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      subreddit: this.subreddit,
      flair: flair,
      editMode: true
    };
    this.dialog.open(CreateEditFlairComponent, dialogConfig).afterClosed().subscribe(() => {
      this.subredditFlairs = []
      this.setupDataSource()
    });
  }

  public openCreateNewDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      subreddit: this.subreddit,
      editMode: false
    };
    this.dialog.open(CreateEditFlairComponent, dialogConfig).afterClosed().subscribe((result) => {
      this.subredditFlairs.push(result.data);
      this.dataSource.data = this.subredditFlairs
    });
  }
}
