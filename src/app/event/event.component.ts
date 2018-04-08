import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from './event.service';
import { Event } from './event.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { ErrorService } from '../error/error.service';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [UserService, EventService, ErrorService]
})
export class EventComponent implements OnInit {

  selectedCategories: Array<string> = [];
  categories: Array<string> = ["chess", "sports", "music"] // TODO: Have a global for supported categories
  dropdownTouched: boolean = false;
  eventLat: number;
  eventLng: number;
  startDate: { year: number, month: number, day: number };
  endDate: { year: number, month: number, day: number };
  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('search') searchLocation: ElementRef;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private errorService: ErrorService,
    private mapsAPI: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {

    this.mapsAPI.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchLocation.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace(); // Gets the place results
          if (place.geometry === undefined || place.geometry === null){
            return;
          }
          this.eventLat = place.geometry.location.lat();
          this.eventLng = place.geometry.location.lng();
        });
      });
    });
  }

  onSubmit(eventForm: NgForm) {

    this.userService.getUserInfo(localStorage.getItem('user_id')).subscribe(user => {
      // Construct JS Date objects using UTC time
      const startTime = eventForm.value.startTime.split(":")
      const startUTCDate: Date = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day, // Month begin at 0 = Jan
                                          Number(startTime[0]), Number(startTime[1]))

      const endTime = eventForm.value.endTime.split(":")
      const endUTCDate: Date = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day,
                                        Number(endTime[0]), Number(endTime[0]))

      // Create an event with the form data and user info
      const event: Event = new Event(
        eventForm.value.eventName,
        this.selectedCategories,
        eventForm.value.numPeople,
        [-97.734375, 37.3002752813443], // Hardcoded values for testing. Will have to convert string location to array of coordinates
        startUTCDate,
        endUTCDate,
        eventForm.value.description,
        user.fullName,
        null,
        {numRsvps: 0, rsvpUsers: new Array<string>() },
        0);

      console.log(JSON.stringify(event))
      // Post to the Database
      this.eventService.createEvent(event).subscribe(res => {
        // Close the modal after successful submission.
        this.closeButton.nativeElement.click();
      }, err => {
        // Return error
      });
    }, err => {
      // Display a message with error
      console.log(err)
    });
  }

  onSelectCategory(category: string) {
    this.selectedCategories.push(category)
    const index = this.categories.indexOf(category)
    this.categories.splice(index, 1);
  }

  onRemoveCategory(category: string) {
    this.categories.push(category)
    const index = this.selectedCategories.indexOf(category)
    this.selectedCategories.splice(index, 1);
  }

  onDropdownTouched(){
    this.dropdownTouched = true;
  }

  onDateChange(type, event){
    switch(type) {
      case 'start': {
        this.startDate = event
      }

      case 'end': {
        this.endDate = event
      }

      default: {
        this.startDate = event
      }
    }
  }
}
