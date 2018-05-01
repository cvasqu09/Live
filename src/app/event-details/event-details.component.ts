import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event/event.model';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
	@Input() event: Event;
  constructor() { }

  ngOnInit() {
  }
}
