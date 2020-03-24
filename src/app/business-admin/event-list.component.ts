import { Component, OnInit, ErrorHandler } from '@angular/core';

import { Event } from './shared/event.model';
import { EventService } from './shared/event.service';

@Component({
  selector: 'app-event-lists',
  templateUrl: './event-list.component.html'
})
export class EventListsComponent implements OnInit {
  title = 'Events';
  events: Event[] = [];

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events;
      });
  }

}
