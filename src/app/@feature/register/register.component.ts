import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validations } from 'src/app/@common/validations/register-validations';
import { AuthService } from '../../@api/auth/auth.service';
import { UserRegister } from '../../@api/models/user-register.model';
import { UserService } from '../../@api/services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public registerForm: any;
  public userRegister!: UserRegister;
  public uploadedImage!: File;
  public avatar: string = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor(
    private userService: UserService,
    private router: Router,
    public validations: Validations
  ) {}

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      repeatPassword: new FormControl(),
    });
  }

  public register(): void {
    this.getUserData();
    if (!this.validations.ok) {
      this.saveData();
    }
  }

  public saveData(): void {
    this.userService.registerUser(this.userRegister).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => {
        this.validations.errorUsernameExists = true;
      },
      complete: () => console.info('complete'),
    });
  }

  private getUserData(): void {
    this.userRegister = new UserRegister(
      this.registerForm.controls.username.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.email.value,
      this.avatar
    );
  }
}
