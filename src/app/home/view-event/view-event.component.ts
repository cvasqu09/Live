import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DatePipe, NgIf, NgForOf } from '@angular/common';
import { EventService } from '../../event/event.service';
import { Event } from '../../event/event.model';
import { MessagingService } from '../../messaging.service';
import { ReportModalComponent } from './report-modal/report-modal.component';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css'],
  providers: []
})
export class ViewEventComponent implements OnInit {
  @ViewChild(ReportModalComponent) reportModalComponent;
  @Input() currentEvent: Event;
  userList: any = [];
  currentUserId: string = localStorage.getItem('user_id');
  currentUser: string;
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
    this.getEventOwner();
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

  getEventOwner(): void {
    if(this.currentEvent != null){
      this.eventService.getEventOwner(this.currentEvent._id).subscribe(res => {
        this.currentUser = res;
      }, err => {
        console.log('error retrieving event owner' + err);
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

  isMyEvent(): boolean {
    return this.currentEvent.eventOwner == localStorage.getItem('user_id')
  }

  onReportButtonClicked(){
    // Close the current modal
    var viewEventBtn: HTMLElement = document.getElementById("viewEventBtn") as HTMLElement;
    viewEventBtn.click();

    // Open the report modal and pass in the current event
    this.reportModalComponent.openModal(this.currentEvent);
  }

  refreshEventData(eventId){

    this.eventService.getEventById(eventId).subscribe(event => {

      this.currentEvent = event;
    });
    this.getRSVPUsers();
    this.updateView();
  }

  markUserJoined(user){
    if(!this.currentEvent.presentUsers.includes(user._id)){
      this.currentEvent.presentUsers.push(user._id);
      this.eventService.editEventWithId(this.currentEvent._id, { presentUsers: this.currentEvent.presentUsers }).subscribe(res => {
        console.log("Successfully joined: " + user.fullName);
      }, err => {
        console.log('Error updating present users');
      })
    }
  }

  badgeColor(user){
    return this.currentEvent.presentUsers.includes(user._id) ? 'badge-success' : 'badge-secondary';
  }
}
