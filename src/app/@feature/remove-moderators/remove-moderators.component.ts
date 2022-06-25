import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { User } from 'src/app/@api/models/user.model';
import { UserService } from 'src/app/@api/services/user.service';

@Component({
  selector: 'app-remove-moderators',
  templateUrl: './remove-moderators.component.html',
  styleUrls: ['../block-unblock-users/block-unblock-users.component.scss']
})
export class RemoveModeratorsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['username', 'email', 'role', 'block'];
  public dataSource = new Observable<MatTableDataSource<User>>();
  private usersList$ = new BehaviorSubject<MatTableDataSource<User>|null>(null);
  public blocked: boolean = false;
  private filterChanges$: Observable<{ filter: string; }>;
  public collectionForm = new FormGroup({ filter: new FormControl('') });
  public loggedInUser!: User;


  constructor(private service: UserService, private authService: AuthService) { 
    this.dataSource = this.setupDataSource();
    this.filterChanges$ = this.setupFilterChanges();
    this.authService.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }

  public ngOnInit(): void { 
    this.dataSource.subscribe();
    this.filterChanges$.subscribe();
  }

  private setupDataSource(): Observable<MatTableDataSource<User>> {
    return this.service.getUsers().pipe(
        switchMap((org: any) => this.service.getUsers()),
        map(usersList => {
          return new MatTableDataSource<User>(usersList.filter((data: any) => data.role === 'moderator'));
        }),
        tap(dataSource => {
          if(this.paginator) {
            dataSource.paginator = this.paginator;
          }
          this.usersList$.next(dataSource);
        })
    );
  }

  private setupFilterChanges(): Observable<{ filter: string; }> {
    return this.collectionForm.valueChanges.pipe(
      tap(change => {
        if (this.usersList$.value) {
          this.usersList$.value.filter = change.filter;
        }
      })
    );
  }

  public observeUsers(): Observable<MatTableDataSource<User> | null>{
    return this.usersList$.asObservable();
  }

  public removeModerator(username: string): void {
    this.service.removeModerator(username).subscribe({
      next: () => console.log('successfuly'),
      error: () => console.log('error'),
      complete: () => console.log('completed')
    });
    this.setupDataSource();
    this.dataSource.subscribe();
  }
}
