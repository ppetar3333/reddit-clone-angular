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
import { SubredditService } from 'src/app/@api/services/subreddit.service';
import { CreateEditRuleComponent } from './create-edit-rule/create-edit-rule.component';

@Component({
  selector: 'app-change-rule',
  templateUrl: './change-rule.component.html',
  styleUrls: ['./change-rule.component.scss']
})
export class ChangeRulesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public subredditId: number;
  public subreddit!: Subreddit;
  public loggedInUser!: User;
  public collectionForm = new FormGroup({ filter: new FormControl('') });
  public displayedColumns: string[] = ['Rule', 'Remove', 'Edit'];
  private filterChanges$: Observable<{ filter: string; }>;
  private rulesList$ = new BehaviorSubject<MatTableDataSource<String>|null>(null);
  public dataSource: Observable<MatTableDataSource<String>>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subredditService: SubredditService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.subredditId = this.activatedRoute.snapshot.params['subredditID'];
    this.authService.getLoggedInUser().subscribe(data => this.loggedInUser = data);
    this.filterChanges$ = this.setupFilterChanges();
    this.dataSource = this.setupDataSource();
  }

  public ngOnInit(): void {
    this.getSubreddit();
    this.dataSource.subscribe();
    this.filterChanges$.subscribe();
  }

  public getSubreddit(): void {
    this.subredditService.getSubredditByID(this.subredditId).subscribe((data) => { 
      this.subreddit = data;
    });
  }

  private setupDataSource(): Observable<MatTableDataSource<String>> {
    return this.subredditService.getSubredditByID(this.subredditId).pipe(
        switchMap(() => this.subredditService.getSubredditByID(this.subredditId)),
        map(usersList => {
          return new MatTableDataSource<String>(usersList.rules);
        }),
        tap(dataSource => {
          if(this.paginator) {
            dataSource.paginator = this.paginator;
          }
          this.rulesList$.next(dataSource);
        })
    );
  }


  private setupFilterChanges(): Observable<{ filter: string; }> {
    return this.collectionForm.valueChanges.pipe(
      tap(change => {
        if (this.rulesList$.value) {
          this.rulesList$.value.filter = change.filter;
        }
      })
    );
  }

  public observeRules(): Observable<MatTableDataSource<String> | null> {
    return this.rulesList$.asObservable();
  }

  public removeRule(rule: string) {
    let arr = this.subreddit.rules?.filter(data => data != rule);
    this.subreddit.rules = arr;
    this.subredditService.updateSubredditByID(this.subreddit, this.subredditId).subscribe(() => {
      this.dataSource = this.setupDataSource();
      this.dataSource.subscribe();
    });
  }

  public editRule(rule: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      subreddit: this.subreddit,
      rule: rule,
      editMode: true
    };
    this.dialog.open(CreateEditRuleComponent, dialogConfig).afterClosed().subscribe(() => {
      this.dataSource = this.setupDataSource();
      this.dataSource.subscribe();
    });
  }

  public openCreateNewDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      subreddit: this.subreddit,
      editMode: false
    };
    this.dialog.open(CreateEditRuleComponent, dialogConfig).afterClosed().subscribe(() => {
      this.dataSource = this.setupDataSource();
      this.dataSource.subscribe();
    });
  }
}
