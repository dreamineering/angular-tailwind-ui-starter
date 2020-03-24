import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, do } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Event } from './event.model';
// import { BaseService } from '../../shared/base.service';

// export class TourService extends BaseService {

@Injectable()
export class EventService {

  apiUrl = 'localhost';

  constructor(private http: HttpClient) {
    // super();
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`);
  }

  getEvent(eventId: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${eventId}`);
  }
}
