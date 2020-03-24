import { Component, Input } from '@angular/core';
import { IFutureBooking } from '../models/future-booking.interface';

@Component({
  selector: 'app-future-booking-table',
  template: `

      <td
        class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 min-w-full"
      >
        {{ fb.siteName }}
      </td>
      <td
        class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 min-w-full"
      >
      {{ fb.totalBookings }}
      </td>
      <td
        class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 min-w-full"
      >
      {{ fb.totalPrivateCharges }}
      </td>
      <td
        class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 min-w-full"
      >
      {{ fb.totalInsuranceCharges }}
      </td>
      <td
        class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500 min-w-full"
      >
      {{ fb.totalInsuranceCharges }}
      </td>

  `,
})
export class FutureBookingTableComponent {
  @Input() fb: IFutureBooking;
}

// bg-gray-50

// <td
// class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
// >
// <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//   <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
// </svg>
// </td>
