import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


// Page
import { EventListComponent } from './event-list.component';
import { EventDetailComponent } from './event-detail.component';


@NgModule({
  imports: [
    CommonModule
    // RouterModule.forChild([
    //   { path: 'overview', component: OverviewComponent },
    // ])
  ],
  declarations: [
    EventListComponent,
    EventDetailComponent
    // HourPipe
  ],
  providers: [
    // HourPipe
  ],
  exports: [
    CommonModule,
    EventListComponent,
    EventDetailComponent
  ]
})
export class BusinessAdminModule { }
