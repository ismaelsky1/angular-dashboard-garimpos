import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService} from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const url: string = state.url;
      return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
      if (this.authenticationService.getToken()) { return true; }
      this.authenticationService.redirectUrl = url;
      this.router.navigate(['/login']);
      return false;
  }

}
