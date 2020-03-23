import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// https://www.positronx.io/angular-jwt-user-authentication-tutorial/
// https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example

import { AuthenticationService } from './authentication.service';


export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.auth.logout();
          }
        }
      }));
  }
}
