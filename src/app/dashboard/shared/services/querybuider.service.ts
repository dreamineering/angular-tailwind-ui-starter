import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
// export class InsightsDataService extends ObservableStore<StoreState> {
export class InsightsDataService {
  private baseUrl = environment.api_url;

  constructor(
    private http: HttpClient
    // private providerScorecardAdapter: ProviderScorecardAdapter
  ) { }


  private getIdsParamFromArray(queryArray: any[]) {
    let idString = '';
    let count = 0;
    queryArray.forEach(function (item) {
      idString += count === 0 ? `ids=${item.id}` : `&ids=${item.id}`;
      count++;
      console.log('building string', idString);
    });
    return idString;
  }

  private configureUrlGrouping(url: string) {
    let ids: string;

    const duration = 7; // this.reportFilterService.selectedDuration.id;
    let datePeriod = 'weeks';

    // if (this.reportFilterService.selectedDatePeriod !== null) {
    //   datePeriod = this.reportFilterService.selectedDatePeriod.text;
    // }

    // const queryDateRange = `duration=${duration}&datePeriod=${datePeriod}`;

    // if (
    //   !this.reportFilterService.analysisOnStaff &&
    //   this.reportFilterService.orgDataGroupedBy.text === 'Organisation'
    // ) {
    //   url = `${url}/organisation?${queryDateRange}&ids=0`;
    // } else if (
    //   !this.reportFilterService.analysisOnStaff &&
    //   this.reportFilterService.orgDataGroupedBy.text === 'Vendor'
    // ) {
    //   ids = this.getIdsParamFromArray(this.reportFilterService.selectedVendors);
    //   url = `${url}/vendors?${ids}&${queryDateRange}`;
    // } else if (!this.reportFilterService.analysisOnStaff && this.reportFilterService.orgDataGroupedBy.text === 'Site') {
    //   ids = this.getIdsParamFromArray(this.reportFilterService.selectedSites);
    //   url = `${url}/sites?${ids}&${queryDateRange}`;
    // } else if (this.reportFilterService.analysisOnStaff) {
    //   ids = this.getIdsParamFromArray(this.reportFilterService.selectedProviders);
    //   url = `${url}/providers?${ids}&${queryDateRange}`;
    // }
    // console.log('url-check', url);
    return url;
  }

}
