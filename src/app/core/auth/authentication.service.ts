import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';
import { environment } from '../../../environments/environment';
import { TokenStorage } from './token-storage.service';

interface AuthData {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

@Injectable()
export class AuthenticationService {
  public name = environment.name;
  public api_url = environment.api_url;
  public locktime = environment.locktime;
  // public signalr = environment.signalr;
  // public phisyio_country = environment.phisyio_country;
  public tokenInterval: any;
  public vendorId: number;

  constructor(private http: HttpClient, private tokenStorage: TokenStorage, private router: Router) {
    this.initTokenHeartbeat();
  }

  refreshToken() {
    if (this.tokenStorage.getAccessToken() && this.tokenStorage.getVendorsToken()) {
      this.tokenInterval.unsubscribe();
      console.log('Refreshing token');
      return this.tokenStorage
        .getRefreshToken()
        .switchMap((refresh_token: string) => {
          return this.http.post(this.api_url + 'api/token', `grant_type=refresh_token&refresh_token=${refresh_token}`);
        })
        .catch(err => {
          this.logout();
          return Observable.throw(err);
        });
    }
  }

  initTokenHeartbeat() {
    if (this.tokenStorage.getAccessToken() && this.tokenStorage.getVendorsToken()) {
      console.log('Init Token Heartbeat');
      let expireToken = (this.tokenStorage.getExpireToken() * 900) / 4;
      console.log('Expire Token', expireToken);
      this.tokenInterval = Observable.interval(expireToken).subscribe(event => {
        this.refreshToken().subscribe((authData: AuthData) => {
          this.saveAuthData(authData);
          this.tokenInterval.unsubscribe();
          this.initTokenHeartbeat();
        });
      });
    }
  }

  login(username: string, password: string, organisationId: string) {
    const payload =
      'grant_type=password&username=' +
      btoa(username) +
      '~' +
      0 +
      '@' +
      btoa(organisationId) +
      '&password=' +
      btoa(password) +
      '&client_id=' +
      environment.clientId +
      '&client_secret=' +
      environment.client_secret;
    return this.http
      .post(this.api_url + 'api/token', payload, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .do((authData: AuthData) => {
        this.saveAuthData(authData);
      });
  }

  loginWithVendor(username: string, password: string, vendorId: string, organisationId: string) {
    const payload =
      'grant_type=password&username=' +
      btoa(username) +
      '~' +
      vendorId +
      '@' +
      btoa(organisationId) +
      '&password=' +
      btoa(password) +
      '&client_id=' +
      environment.clientId +
      '&client_secret=' +
      environment.client_secret;
    return this.http
      .post(this.api_url + 'api/token', payload, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .do((authData: AuthData) => {
        this.saveAuthData(authData);
      });
  }

  getVendorsForLogin(): Observable<any> {
    return this.http.get(this.api_url + 'api/v1/gpm/vendor/GetVendorBySystemUser');
  }

  cacheSelectedVendor(vendorId: number) {
    return this.http.get(this.api_url + 'api/v1/gpm/cache/populate?vendorId=' + vendorId).do(() => {
      console.log('Successfully logged in');
      this.tokenStorage.setVendorsToken();
      this.tokenStorage.setLockscreenToken('false');
      this.tokenStorage.setVendorId(vendorId);
      this.initTokenHeartbeat();
    });
  }

  logout(): void {
    this.tokenStorage.clearSession();
    this.router.navigate(['/login']);
  }

  saveAuthData(authData: AuthData) {
    this.tokenStorage
      .setAccessToken(authData.access_token)
      .setRefreshToken(authData.refresh_token)
      .setExpiresToken(authData.expires_in);
  }

  getLoggedUser(): Observable<any> {
    return this.http.get(this.api_url + 'api/v1/gpm/systemUser/current_user');
  }

  loginWithHash(hash: string, captchaResponse: string) {
    const payload =
      'grant_type=password&hash=' +
      hash +
      '&captchaResponse=' +
      captchaResponse +
      '&client_id=' +
      environment.clientId +
      '&client_secret=' +
      environment.client_secret;
    return this.http
      .post(this.api_url + 'api/forms/token', payload, {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .do((authData: AuthData) => {
        this.saveAuthData(authData);
      });
  }
}
