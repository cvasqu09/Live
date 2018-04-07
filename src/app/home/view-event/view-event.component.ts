import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { EventService } from '../../event/event.service';
import { Event } from '../../event/event.model';


@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css'],
  providers: [EventService]
})
export class ViewEventComponent implements OnInit {

  @Input() currentEvent: Event;

  constructor(public eventService: EventService) { }

  ngOnInit() {

  }

  // Retrieve the entire event object
  eventClicked(){
    var viewEventBtn: HTMLElement = document.getElementById("viewEventBtn") as HTMLElement;
    viewEventBtn.click();
  }

  updateRSVP(){

    this.currentEvent.rsvps += 1;
    this.eventService.editEventWithId(this.currentEvent._id, this.currentEvent).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }
}
