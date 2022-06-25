import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { User } from 'src/app/@api/models/user.model';
import { NoAccessDialogComponent } from '../../no-access-dialog/no-access-dialog.component';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
})
export class NavUserComponent implements OnInit {
  private loggedInUser!: User;


  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.getLoggedInUser();
  }


  public getLoggedInUser(): void {
    this.authService.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }

  public addPostBtn(): void {
    if(!this.loggedInUser.banned) {
      this.router.navigate(['/add-post'])
    } else {
      this.noAccessUserBanned()
    }
  }

  public noAccessUserBanned(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      buttonText: 'Ok',
      dialogText: 'Your profile is banned.',
      navigateTo: ''
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate([''])
    });
  }
}
