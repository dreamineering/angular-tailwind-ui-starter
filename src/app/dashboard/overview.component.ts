import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubSink } from 'subsink';

import { DashboardDataService } from './shared/services/dashboard.data.service';

@Component({
  selector: 'app-overview-dashboard',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit, OnDestroy {

  private subs = new SubSink();

  constructor(
    // private organisationService: DataOrganisationService,
    // public reportFilterService: ReportFilterStateService,
    // private insightsService: InsightsDataService,
    // private presentationService: DataManipulationService
  ) { }

  ngOnInit(): void {
  }

  getDashboardOverview() {
    // this.subs.sink = this.organisationService.getKpiDefinitions().subscribe(data => {
    //   this.kpiReports = data;
    // });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
