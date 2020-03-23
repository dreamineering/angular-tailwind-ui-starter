import { TokenStorage } from '../auth/token-storage.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Injectable, Injector } from '@angular/core';
import {
  Router,
  Route,
  CanActivate,
  CanActivateChild,
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
// import { Route } from '@angular/compiler/src/core';
// import { PrivilegeType } from '@enums/web-privileges';

@Injectable()
export class AppGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private inj: Injector) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateCommponent();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateCommponent();
  }

  canActivateCommponent() {
    const tokenStorage = this.inj.get(TokenStorage);
    if (this.isLoggedIn()) {
      if (tokenStorage.getLastVendorId() !== null && tokenStorage.getLastVendorId() !== tokenStorage.getVendorId()) {
        tokenStorage.setLastVendorId(tokenStorage.getVendorId());
        window.location.reload();
      } else {
        tokenStorage.setLastVendorId(tokenStorage.getVendorId());
      }
      return true;
    }
    const authService = this.inj.get(AuthenticationService);
    authService.logout();
    return false;
  }

  isLoggedIn() {
    const tokenStorage = this.inj.get(TokenStorage);
    return tokenStorage.getAccessToken() !== null && tokenStorage.getVendorsToken() !== null;
  }

  hasPathPrivilege(path): boolean {
    const slashPosition = path.indexOf('/');
    if (slashPosition > 0) {
      path = path.substring(0, slashPosition);
    }
    const tokenStorage = this.inj.get(TokenStorage);
    const privileges = tokenStorage.getMenuPrivileges();
    if (privileges) {
      const privilege = privileges.find(x => x.state === path);
      return privilege !== null && privilege !== undefined;
    }
    return false;
  }
}
