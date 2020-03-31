import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardDataService } from './shared/services/dashboard.data.service';

// Component
import { FutureBookingTableComponent } from './shared/components/future-bookings-table.component';

// Page
import { OverviewComponent } from './overview.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'overview', component: OverviewComponent },
      // { path: 'provider-performance', component: AnalysisNavComponent },
      // { path: 'analysis/marketing/:id', component: MarketingComponent },
      // { path: 'analysis/:busFunction/:reportName', component: AnalysisComponent }
    ])
  ],
  providers: [
    DashboardDataService
  ],
  declarations: [
    FutureBookingTableComponent,
    OverviewComponent,
  ],
  exports: [
    FutureBookingTableComponent
  ]
})
export class DashboardModule { }
