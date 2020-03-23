import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Services and app level components */
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

/*** Components ***/
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
