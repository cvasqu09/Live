import { Component, OnInit, ViewChild, ElementRef, NgZone, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from './event.service';
import { Event } from './event.model';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { GoogleMapComponent } from '../home/google-map/google-map.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  formReset: boolean = false;
  selectedCategories: Array<string> = [];
  categories: Array<string> = ["chess", "sports", "music"] // TODO: Have a global for supported categories
  dropdownTouched: boolean = false;
  eventLat: number;
  eventLng: number;
  eventAddress: string;
  startDate: { year: number, month: number, day: number };
  endDate: { year: number, month: number, day: number };
  @Output() onEventCreated = new EventEmitter<void>(); // Emits events to google-map.component in order to update.
  @ViewChild('closeButton') closeButton: ElementRef;
  @ViewChild('search') searchLocation: ElementRef;

  constructor(
    private eventService: EventService,
    private userService: UserService,
    private mapsAPI: MapsAPILoader,
    private ngZone: NgZone,
    private googleMaps: GoogleMapComponent
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
          this.eventAddress = place.formatted_address;
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
        this.eventAddress,
        [this.eventLng, this.eventLat],
        startUTCDate,
        endUTCDate,
        eventForm.value.description,
        user._id,
        null,
        {numRsvps: 1, rsvpUsers: [user._id] },
        0);

      this.eventService.createEvent(event).subscribe(res => {
        // Reset the form and close the modal
        console.log("successfully sent" + JSON.stringify(event))
        eventForm.resetForm();
        this.formReset = true;
        this.onEventCreated.emit();
        this.closeButton.nativeElement.click();
      }, err => {
        // Return error
      });
      // Set the formReset back to false so that it can be set to true upon the next submission
      this.formReset = false;
    }, err => {
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
        break;
      }

      case 'end': {
        this.endDate = event
        break;
      }

      default: {
        this.startDate = event
        break;
      }
    }
  }
}
