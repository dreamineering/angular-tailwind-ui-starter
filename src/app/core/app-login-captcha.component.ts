import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { TokenStorage } from './auth/token-storage.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login-captcha',
  templateUrl: './app-login-captcha.component.html'
})
export class AppLoginComponent implements OnInit, OnDestroy {
  public destroySubscriptions: Subject<boolean> = new Subject<boolean>();
  public hash: string;
  public loginErrors: any;
  public showCaptcha: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.hash = this.route.parent.snapshot.queryParams['hash'];
      if (this.hash !== null && this.hash !== undefined && this.hash !== '') {
        this.showCaptcha = true;
      } else {
        this.showCaptcha = false;
        this.loginErrors = 'Invalid Link';
      }
    });
    this.tokenStorage.clearSession();
  }

  resolved(captchaResponse: string) {
    this.authService
      .loginWithHash(this.hash, captchaResponse)
      .takeUntil(this.destroySubscriptions)
      .subscribe(
        () => {
          this.tokenStorage.setFillFormAccess();
          this.router.navigate(['/forms']);
        },
        err => {
          console.log('Error', err);
          this.loginErrors = err.error.error_description;
        }
      );
  }

  ngOnDestroy(): void {
    this.destroySubscriptions.next();
    this.destroySubscriptions.unsubscribe();
  }
}
