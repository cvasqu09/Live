import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DatePipe, NgIf, NgForOf } from '@angular/common';
import { EventService } from '../../event/event.service';
import { Event } from '../../event/event.model';
import { MessagingService } from '../../messaging.service';

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
  rsvpUsers: any = [];

  constructor(
    private eventService: EventService,
    private smsService: MessagingService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {

  }

  ngOnChanges() {
    this.getRSVPUsers();
  }

  // Retrieve the entire event object
  eventClicked(){
    this.getRSVPUsers();

    var viewEventBtn: HTMLElement = document.getElementById("viewEventBtn") as HTMLElement;
    viewEventBtn.click();
  }

  updateRSVP(){
    this.currentEvent.rsvps['numRsvps']++;
    this.currentEvent.rsvps.rsvpUsers.push(localStorage.getItem("user_id"));
    this.eventService.editEventWithId(this.currentEvent._id, this.currentEvent).subscribe(
      response => {
        this.smsService.sendNotificationTexts().subscribe();
        this.getRSVPUsers();
        // console.log(response);
      },
      error => {
        console.log(this.currentEvent);
        console.log(JSON.stringify(this.currentEvent))
        console.log(JSON.stringify(error));
      }
    );
  }

  leaveRSVP(){

    this.currentEvent.rsvps['numRsvps']--;
    const userIndex = this.currentEvent.rsvps.rsvpUsers.indexOf(localStorage.getItem("user_id"));
    // Make sure the user is even in the list
    if(userIndex !== -1){
      console.log(userIndex);
      this.currentEvent.rsvps.rsvpUsers.splice(userIndex, 1);
      this.eventService.editEventWithId(this.currentEvent._id, this.currentEvent).subscribe(
        response => {
          //this.smsService.sendNotificationTexts().subscribe();
          this.getRSVPUsers();
          // console.log(response);
        },
        error => {
          console.log(this.currentEvent);
          console.log(JSON.stringify(this.currentEvent))
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  getRSVPUsers(): void {
    if(this.currentEvent != null && this.currentEvent._id != null){
      this.eventService.getRsvpUsers(this.currentEvent._id).subscribe(res => {
        this.rsvpUsers = res.json();
      }, err => {
        console.log('error in get rsvpUsers' + err);
      })
    }
  }

  // Updates the modal to have the new rsvp users.
  updateView(): void {
    this.ref.detectChanges()
  }

  userRSVPEvent(userList): boolean {
    //If user is already in the RSVP list
    if(userList != null && userList.indexOf(localStorage.getItem('user_id')) != -1){
      return true;
    }
    else {
      return false;
    }
  }
}
