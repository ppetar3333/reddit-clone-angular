import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";


@Injectable({
    providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authenticationService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.getRole().includes(next.data["role"])) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
