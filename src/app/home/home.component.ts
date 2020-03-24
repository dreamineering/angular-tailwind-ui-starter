import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IFutureBooking } from '../dashboard/shared/models/future-booking.interface';


// https://ultimatecourses.com/blog/angular-ngfor-template-element
// https://www.positronx.io/build-dynamic-html-table-in-angular-with-ngfor/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  futureBookings: Observable<IFutureBooking[]>;

  constructor() { }

  ngOnInit() {
    this.futureBookings = of([
      {
        siteName: 'Clapham',
        totalOnlineBookings: 3,
        totalBookings: 47,
        totalPrivateCharges: 0,
        totalInsuranceCharges: 0,
        totalMembershipCharges: 0,
        totalClassCharges: 0
      },
      {
        siteName: 'Clapham',
        totalOnlineBookings: 3,
        totalBookings: 47,
        totalPrivateCharges: 0,
        totalInsuranceCharges: 0,
        totalMembershipCharges: 0,
        totalClassCharges: 0
      },
      {
        siteName: 'Barnes',
        totalOnlineBookings: 3,
        totalBookings: 47,
        totalPrivateCharges: 0,
        totalInsuranceCharges: 0,
        totalMembershipCharges: 0,
        totalClassCharges: 0
      },
      {
        siteName: 'Putney',
        totalOnlineBookings: 3,
        totalBookings: 47,
        totalPrivateCharges: 0,
        totalInsuranceCharges: 0,
        totalMembershipCharges: 0,
        totalClassCharges: 0
      },
      {
        siteName: 'Wimbledon',
        totalOnlineBookings: 3,
        totalBookings: 47,
        totalPrivateCharges: 0,
        totalInsuranceCharges: 0,
        totalMembershipCharges: 0,
        totalClassCharges: 0
      },
    ]);
  }
}
