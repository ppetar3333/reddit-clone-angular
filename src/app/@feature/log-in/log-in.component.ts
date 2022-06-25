import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Auth } from '../../@api/auth/auth.model';
import { AuthService } from '../../@api/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LoginComponent implements OnInit {
  formForm: any;
  error: string = '';
  errorMessage: string = 'Bad Credentials!';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    let auth = new Auth(
      this.formForm.controls.username.value,
      this.formForm.controls.password.value
    );

    this.authService.login(auth).subscribe({
      next: (res) => {
        this.authService.setLoggedInPassword(this.formForm.controls.password.value);
        this.router.navigate(['/']);
      },
      error: (error) => (this.error = error),
      complete: () => console.info('complete'),
    });
  }
}
