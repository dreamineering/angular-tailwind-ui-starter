import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AppGuard } from './services/guard.service';
import { TokenStorage } from './auth/token-storage.service';
import { AuthenticationService } from './auth/authentication.service';

// import { SidebarService } from '@services/sidebar.service';
// import { HomeService } from '@services/home.service';
// import { PreviousRouteService } from '../shared/services/previous-route.service';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
})
export class AppLoginComponent implements OnInit, OnDestroy {
  public destroySubscriptions: Subject<boolean> = new Subject<boolean>();
  public organisationName: string;
  public userName: string;
  public loginForm: FormGroup;
  public vendorForm: FormGroup;
  public loginErrors: any;
  public showVendorForm = false;
  public vendorsList: any;
  public locktime = environment.locktime;
  public chooseVendorInterval: any;
  // public version = environment.version;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private formBuilder: FormBuilder,
    private appGuard: AppGuard,
    // private sidebarService: SidebarService,
    // private homeService: HomeService,
    // private previousRouteService: PreviousRouteService
  ) { }

  ngOnInit() {
    if (this.appGuard.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;
    }

    this.tokenStorage.clearSession();
    this.didUserEverLogIn();
    this.createForm();
    // this.previousRouteService.setCurrentUrl();
  }

  didUserEverLogIn() {
    this.organisationName =
      localStorage.getItem('organisation_name') === null ? '' : localStorage.getItem('organisation_name');
    this.userName = localStorage.getItem('user_name') === null ? '' : localStorage.getItem('user_name');
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      organisation: [this.organisationName, Validators.required],
      username: [this.userName, Validators.required],
      password: ['', Validators.required]
    });

    this.vendorForm = this.formBuilder.group({
      vendorId: ['', Validators.required]
    });
  }

  onLoginSubmit() {
    this.loginErrors = undefined;
    localStorage.setItem('user_name', this.loginForm.value.username);
    this.login();
  }

  initializeRestoreLoginPage() {
    this.chooseVendorInterval = Observable.interval(this.locktime).subscribe(() => {
      this.chooseVendorInterval.unsubscribe();
      this.showVendorForm = false;
      this.ngOnInit();
    });
  }

  login() {
    this.tokenStorage.clearSession();
    // let loginButton = <HTMLInputElement>document.getElementById('loginButton');
    // loginButton.innerText = 'Loading...';
    // loginButton.disabled = true;
    this.authService
      .login(
        this.loginForm.value.username,
        this.loginForm.value.password,
        this.loginForm.value.organisation
      )
      .pipe(takeUntil(this.destroySubscriptions)
        .subscribe(
          () => {
            this.authService
              .getVendorsForLogin()
              .pipe(takeUntil(this.destroySubscriptions)
                .subscribe(
                  vendorData => {
                    if (vendorData.length === 1) {
                      this.showVendorForm = false;
                      this.initializeRestoreLoginPage();
                      this.vendorForm.controls['vendorId'].setValue(vendorData[0].ID);
                      this.vendorForm.value.vendorId = vendorData[0].ID;
                      this.onVendorSubmit();
                    } else {
                      this.showVendorForm = true;
                      this.vendorsList = vendorData.sort((a, b) => a.NAME.localeCompare(b.NAME));
                      this.vendorForm.controls['vendorId'].setValue(this.vendorsList[0].ID);
                      this.initializeRestoreLoginPage();
                    }
                  },
                  err => console.log(err)
                );
          },
          err => {
            console.log('Error', err);
            loginButton.innerText = 'Login';
            this.loginForm.reset();
            this.loginForm.controls['organisation'].setValue(this.organisationName);
            this.loginForm.controls['username'].setValue(this.userName);
            this.loginErrors = err.error.error_description;
          }
        );
  }

  onVendorSubmit() {
    this.authService
      .loginWithVendor(
        this.loginForm.value.username,
        this.loginForm.value.password,
        this.vendorForm.value.vendorId,
        this.loginForm.value.organisation
      )
      .takeUntil(this.destroySubscriptions)
      .subscribe(res => {
        this.cacheVendor();
      });
  }

  cacheVendor() {
    this.authService
      .cacheSelectedVendor(this.vendorForm.value.vendorId)
      .takeUntil(this.destroySubscriptions)
      .subscribe(
        () => {
          localStorage.setItem('organisation_name', this.loginForm.value.organisation);
          this.chooseVendorInterval.unsubscribe();
          // this.getMenuPrivileges();
        },
        err => console.log('Error', err)
      );
  }

  // getMenuPrivileges() {
  //   this.sidebarService
  //     .buildMenu()
  //     .takeUntil(this.destroySubscriptions)
  //     .subscribe(
  //       data => {
  //         this.tokenStorage.setMenuPrivileges(data);
  //         this.router.navigateByUrl('/');
  //       },
  //       err => {
  //         console.log('Err', err);
  //       }
  //     );
  // }

  ngOnDestroy() {
    this.destroySubscriptions.next();
    this.destroySubscriptions.unsubscribe();
  }
}
