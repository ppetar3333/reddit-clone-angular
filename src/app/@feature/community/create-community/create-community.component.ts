import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SubredditValidation } from 'src/app/@common/validations/subreddit-validation';
import { NoAccessDialogComponent } from 'src/app/@ui/no-access-dialog/no-access-dialog.component';
import { AuthService } from '../../../@api/auth/auth.service';
import { EUserRole } from '../../../@api/models/EUserRole';
import { Subreddit } from '../../../@api/models/subreddit.model';
import { User } from '../../../@api/models/user.model';
import { SubredditService } from '../../../@api/services/subreddit.service';
import { UserService } from '../../../@api/services/user.service';
import { NavComponent } from '../../../@ui/nav/nav.component';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
})
export class CreateCommunity implements OnInit {
  user!: User;
  subredditForm: any;
  subreddit!: Subreddit;
  name: string = '';
  description: string = '';
  nav!: NavComponent;

  constructor(
    private authService: AuthService,
    private subredditService: SubredditService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    public validations: SubredditValidation
  ) {}

  public ngOnInit(): void {
    this.subredditForm = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
    });
    this.getLoggedInUser();
  }

  public getLoggedInUser(): void {
    this.authService.getLoggedInUser().subscribe((data) => {
      this.user = data;
    });
  }

  private getSubredditData(): void {
    this.subreddit = new Subreddit();
    this.subreddit.name = this.subredditForm.value.name;
    this.subreddit.description = this.subredditForm.value.description;
    this.subreddit.rules = ['1', '2', '3'];
    if(this.authService.getRole() === 'ROLE_korisnik') {
      this.user.role = EUserRole.moderator;
    }
    this.saveModerator();
    this.subreddit.moderators = [this.user];
    this.subreddit.suspendedReason = '';
  }

  private saveModerator(): void {
    this.userService.updateUserByID(this.user, this.user.userID).subscribe({
      next: () => console.log('success-user'),
      error: () => console.log('error-user'),
      complete: () => console.info('complete-user'),
    });
  }

  public saveData(): void {
    if (!this.validations.ok) {
      this.getSubredditData();
      this.subredditService.saveSubreddit(this.subreddit).subscribe({
        next: () => this.redirectUser(),
        error: () => console.log('error-subreddit'),
        complete: () => console.info('complete-subreddit'),
      });
    }
  }

  public redirectUser(): void {
    this.authService.logout();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      buttonText: 'Ok',
      dialogText: 'Congrats! You are now moderator, please login.',
      navigateTo: '/login'
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate(['/login'])
    });
  }
}
