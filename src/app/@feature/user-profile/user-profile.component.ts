import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@api/auth/auth.service';
import { EReactionType } from 'src/app/@api/models/EReactionType';
import { User } from 'src/app/@api/models/user.model';
import { ReactionService } from 'src/app/@api/services/reaction.service';
import { UserService } from 'src/app/@api/services/user.service';
import { Validations } from 'src/app/@common/validations/register-validations';
import { NoAccessDialogComponent } from 'src/app/@ui/no-access-dialog/no-access-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup;
  public editMode: boolean = false;
  public user!: User;
  public karmaUser: number = 0;
  public showAvatarsCollection: boolean = false;
  public avatarsCollection: string[];
  public avatarImg: string = '';
  @ViewChild('username') username!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('displayName') displayName!: ElementRef;
  @ViewChild('profileDesc') profileDesc!: ElementRef;

  constructor(
    private authService: AuthService, 
    public validations: Validations, 
    private router: Router,
    private reactionService: ReactionService,
    private userService: UserService,
    private dialog: MatDialog) {
    this.getLoggedInUser(); 
    this.userForm = new FormGroup({
      username: new FormControl(this.user?.username, Validators.required),
      email: new FormControl(this.user?.email, Validators.required),
      displayName: new FormControl(this.user?.displayName, Validators.required),
      profileDesc: new FormControl(this.user?.profileDescription, Validators.required),
      avatar: new FormControl(this.user?.avatar, Validators.required)
    })
    this.avatarsCollection = this.getAvatarsCollection();
  }

  public ngOnInit(): void {
    this.disableFormControl();
  }

  public disableFormControl(): void {
    this.userForm.get('username')?.disable();
    this.userForm.get('email')?.disable();
    this.userForm.get('displayName')?.disable();
    this.userForm.get('profileDesc')?.disable();
  }

  public getAvatarsCollection(): string[] {
    return ['https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png', 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png', 'https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes.png', 'https://image.pngaaa.com/260/1721260-middle.png', 'https://image.pngaaa.com/414/81414-middle.png'];
  }

  public restartAvatarCollection(): void {
    this.avatarImg = '';
    this.avatarsCollection = this.getAvatarsCollection();
  }

  public getLoggedInUser(): void {
    this.authService.getLoggedInUser().subscribe({
      next: (data) => { 
        this.user = data;
        this.reactionService.getReactionsByUserId(this.user.userID).subscribe(data => {
          data.forEach(element => {
            if (element.type.toString() === 'upvote') {
              this.karmaUser++;
            } else {
              this.karmaUser--;
            }
          });
        })
      }
    })
  }

  public saveData(): void {
    const username = this.username.nativeElement.value;
    const email = this.email.nativeElement.value;
    const displayName = this.displayName.nativeElement.value;
    const profileDesc = this.userForm.get('profileDesc')?.value;
    const userPhoto = this.avatarImg;

    if(!this.validations.ok) {
      this.user.username = username;
      this.user.email = email;
      this.user.displayName = displayName;
      this.user.profileDescription = profileDesc;

      if (this.avatarImg) {
        this.user.avatar = userPhoto;
      }

      this.userService.updateUserByID(this.user, this.user.userID).subscribe({
        next: () => this.redirectUser(),
        error: () => {
          this.validations.errorUsernameExists = true;
        },
        complete: () => console.info('complete'),
      });
    }
  }

  public redirectUser(): void {
    this.authService.logout();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      buttonText: 'Ok',
      dialogText: 'Because you have changed your data, you need to login.',
      navigateTo: '/login'
    };
    this.dialog.open(NoAccessDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

  public enableEditMode(): void {
    this.editMode = true;
    this.userForm.get('username')?.enable();
    this.userForm.get('email')?.enable();
    this.userForm.get('displayName')?.enable();
    this.userForm.get('profileDesc')?.enable();
  }

  public changePassword(): void {
    this.router.navigate(['change-password'])
  }

  public userStatus(): string {
    if (this.user?.banned) {
      return 'Your Profile Is Banned';
    }
    return "Your Profile Is Not Banned"
  }

  public showAvatars(): void {
    this.showAvatarsCollection = !this.showAvatarsCollection;
  }

  public selectedImg(url: string): void {
    this.avatarImg = url;
    this.avatarsCollection = [];
    this.avatarsCollection.push(url)
  }
}
