import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from './shared/event.model';
import { EventService } from './shared/event.service';
import { ActivatedRoute } from '@angular/router';
// import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
// import { MasterDataService } from '../../shared/master-data.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit, OnDestroy {

  public event: any;
  private eventId: string;
  private sub: Subscription;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    // get route data (tourId)
    this.sub = this.route.params.subscribe(
      params => {
        this.eventId = params['eventId'];

        this.eventService.getEvent(this.eventId)
          .subscribe(event => {
            this.event = event;
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
