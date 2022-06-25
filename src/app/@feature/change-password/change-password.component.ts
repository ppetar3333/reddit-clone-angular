import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { User } from 'src/app/@api/models/user.model';
import { UserService } from 'src/app/@api/services/user.service';
import { NoAccessDialogComponent } from 'src/app/@ui/no-access-dialog/no-access-dialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public user!: User;
  public userForm: FormGroup;
  public loggedInUser!: User;
  public encryptSecretKey!: any;
  public loggedInPassword: string = '';
  public displayErrorMessagePassword: boolean = false;
  public passwordErrorMessage: string = "Password need's to be at least 8 characters";
  public errorCurrentPassword: boolean = false;
  public currentPasswordMessage: string = "This isn't your current password";
  private ok: boolean = false;

  constructor(
    private authService: AuthService, 
    private userService: UserService, 
    private router: Router, 
    private dialog: MatDialog) {
      this.userForm = new FormGroup({
        currentPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
        newPassowrd: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])),
      });
  }

  public ngOnInit(): void {
    this.authService.getLoggedInUser().subscribe(data => this.loggedInUser = data);
  }

  public saveChanges(): void {
      let username = this.loggedInUser.username;
      let currentPassword = this.userForm.get('currentPassword')?.value;
      let newPassword = this.userForm.get('newPassowrd')?.value;

      console.log(username)
      console.log(currentPassword)
      console.log(newPassword)

      this.userService.changePassword(username, currentPassword, newPassword).subscribe((data) => {
        if (!data) {
          this.errorCurrentPassword = true;
        } else {
          if(data.includes('Success')) {
            this.authService.logout();
            this.redirectUser();
          }
        }
      });
  }

  public redirectUser(): void {
    this.authService.logout();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      buttonText: 'Ok',
      dialogText: 'Success! Please login.',
      navigateTo: '/login'
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

  showErrorPassowrd(value: string) {
    if (value.length < 8) {
      this.displayErrorMessagePassword = true;
      this.ok = true;
    } else {
      this.displayErrorMessagePassword = false;
      this.ok = false;
    }
  }
}
