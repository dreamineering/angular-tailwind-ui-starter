import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
import { TokenStorage } from './token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private tokenStorage: TokenStorage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.tokenStorage.getAccessToken()}`
      }
    });
    return next.handle(request);

    // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //   if (this.tokenStorage.getAccessToken()) {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${this.tokenStorage.getAccessToken()}`
    //       }
    //     });
    //   }


    // return next
    //   .handle(request)
    //   .do(event => {
    //     if (event instanceof HttpResponse) {
    //     }
    //   })
    //   .pipe(
    //     catchError(err => {
    //       if (err.status === 401) {
    //         // auto logout if 401 response returned from api
    //         this.authenticationService.logout();
    //         location.reload(true);
    //       }
    //       return throwError(err);
    //     })
    //   );
  }
}
