import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from './event.service';
import { Event } from './event.model'
import { UserService } from '../user/user.service'
import { User } from '../user/user.model'
import { ErrorService } from '../error/error.service'

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
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(private eventService: EventService, private userService: UserService, private errorService: ErrorService) { }

  ngOnInit() {
  }

  onSubmit(eventForm: NgForm) {
    this.userService.getUserInfo(localStorage.getItem('user_id')).subscribe(user => {
      // Create an event with the form data and user info
      const event: Event = new Event(
        eventForm.value.eventName,
        this.selectedCategories,
        eventForm.value.numPeople,
        [-97.734375, 37.3002752813443], // Hardcoded values for testing. Will have to convert string location to array of coordinates
        Number(eventForm.value.startTime.replace(":", "")),
        Number(eventForm.value.endTime.replace(":", "")),
        eventForm.value.description,
        user.fullName,
        null,
        0,
        0
      );

      // Post to the Database
      this.eventService.createEvent(event).subscribe(res => {
        // Close the modal after successful submission.
        this.closeButton.nativeElement.click();
      }, err => {
        // Display a message with error
        // this.errorService.emitError(err)
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

}
