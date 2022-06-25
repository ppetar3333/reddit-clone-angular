import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRegister } from 'src/app/@api/models/user-register.model';
import { User } from 'src/app/@api/models/user.model';
import { AuthService } from '../../@api/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  _admin = new BehaviorSubject<boolean>(false);
  admin = this._admin.asObservable();
  _moderator = new BehaviorSubject<boolean>(false);
  moderator = this._moderator.asObservable();
  _user = new BehaviorSubject<boolean>(false);
  user = this._user.asObservable();
  role = new BehaviorSubject<string>('');
  loggedInUser!: User;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.authService.getLoggedInUser().subscribe((data) => {
      this.role.next(data.role.toString());
    });
    this.role.next(this.authService.getRole());
    if(this.role.getValue() === 'ROLE_korisnik') {
      this._user.next(true);
    } else if(this.role.getValue() === 'ROLE_moderator') {
      this._moderator.next(true);
    } else {
      this._admin.next(true);
    }
  }
}
