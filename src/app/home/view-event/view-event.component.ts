import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DatePipe, NgIf, NgForOf } from '@angular/common';
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
  userList: any = [];
  currentUser: string = localStorage.getItem('user_id');

  constructor(private eventService: EventService) { }

  ngOnInit() {

  }

  // Retrieve the entire event object
  eventClicked(){
    var viewEventBtn: HTMLElement = document.getElementById("viewEventBtn") as HTMLElement;
    viewEventBtn.click();
  }

  updateRSVP(){

    this.currentEvent.rsvps['numRsvps']++;
    this.currentEvent.rsvps.rsvpUsers.push(localStorage.getItem("user_id"));
    this.eventService.editEventWithId(this.currentEvent._id, this.currentEvent).subscribe(
      response => {
        console.log(response);
      },
      error => {

      }
    );
  }

  userRSVPEvent(userList): boolean {
    if(userList != null && userList.indexOf(localStorage.getItem('user_id')) != -1){
      return true;
    }
    else {
      return false;
    }
  }
}
