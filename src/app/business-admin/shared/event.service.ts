import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Event } from './event.model';
import { EventWithDetails } from './event-with-details.model';
// import { BaseService } from '../../shared/base.service';

// export class TourService extends BaseService {

@Injectable()
export class EventService {

  apiUrl = 'http://localhost:51681/api/business-admin/2596540/';

  constructor(private http: HttpClient) {
    // super();
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${eventId}`);
  }

  getEventWithDetails(eventId: string): Observable<EventWithDetails> {
    return this.http.get<EventWithDetails>(`${this.apiUrl}/events/${eventId}`,
      { headers: { Accept: 'application/vnd.gensolve.eventwithdetails+json' } });
  }


}
