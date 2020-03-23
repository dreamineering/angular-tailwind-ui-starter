import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/bearer-token.interceptor';
import { HttpErrorInterceptor } from './auth/http-error.interceptor';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { AppNavComponent } from './app-nav.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // HttpClientModule,
    // CoreMaterialModule
    // StoreModule.forRoot({}),
    // StoreDevtoolsModule.instrument({
    //   name: 'AMP Demo App Devtools',
    //   maxAge: 25,
    //   logOnly: environment.production
    // })
  ],
  declarations: [
    AppNavComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorInterceptor,
    //   multi: true
    // },
    // UserService,
    // DataStdBusinessTermsService,
    // DataOrganisationService
  ],
  exports: [
    // HttpClientModule,
    AppNavComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
