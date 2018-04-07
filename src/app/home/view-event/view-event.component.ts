import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { EventService } from '../../event/event.service';
import { Event } from '../../event/event.model';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css'],
  providers: []
})
export class ViewEventComponent implements OnInit {

  @Input() currentEvent: Event;

  constructor() { }

  ngOnInit() {

  }

  // Retrieve the entire event object
  eventClicked(){
    var viewEventBtn: HTMLElement = document.getElementById("viewEventBtn") as HTMLElement;
    viewEventBtn.click();
  }

  updateRSVP(){

    console.log(this.currentEvent);
    this.currentEvent.rsvps['numRsvps']++;
  //
  //   this.eventService.editEventWithId("5ac6e17510988a56e8cd8b2d", this.currentEvent).subscribe(
  //     response => {
  //       console.log(response);
  //     },
  //     error => {
  //       this.profileSettings.triggerNewUserModal(true);
  //     }
  //   );
  }
}
