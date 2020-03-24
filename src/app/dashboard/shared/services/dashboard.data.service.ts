import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

// import { ObservableStore } from '@codewithdan/observable-store';

import { environment } from '../../../../environments/environment';

// import { ProviderScorecard, ProviderScorecardAdapter } from '../models/provider-scorecard.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardDataService {
  private baseUrl = environment.api_url;

  // https://localhost:44317/api/organisation/2596540

  // 7523085  - 626884882 blh
  // 15673085 - 602677702 gso
  // 2596540  - 784444212 demo

  constructor(
    private http: HttpClient
    // private providerScorecardAdapter: ProviderScorecardAdapter
  ) { }


  public GetOverviewDashboard(): Observable<any> {
    // let url = `${this.baseUrl}/dashboard/${orgId}/actions/insight-headlines`;
    const url = `${this.baseUrl}/7523085/dashboards?entityGroup=organisation&systemUserId=626884882`;

    return this.http.get<any[]>(url).pipe(
      tap(data => console.log('Overview Dashboard', JSON.stringify(data, null, 2))),
      // catchError(this.handleError)
    );
  }

}
