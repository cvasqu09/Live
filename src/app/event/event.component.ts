import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from './event.service';
import { Event } from './event.model'
import { UserService } from '../user/user.service'
import { User } from '../user/user.model'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [UserService, EventService]
})
export class EventComponent implements OnInit {
  selectedCategories: Array<string> = [];
  categories: Array<string> = ["chess", "sports", "music"]

  constructor(private eventService: EventService, private userService: UserService) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(response => {
      console.log(response);
    })
  }

  onSubmit(eventForm: NgForm) {
  	console.log("Submitted")
  	console.log(eventForm)
    var user: User;

    // this.userService.getUserInfo

    // const event: Event = new Event(
    //   eventForm.value.eventName,
    //   selectedCategories,
    //   eventForm.value.numPeople,
    //   [-97.734375, 37.3002752813443], // Hardcoded values for testing. Will have to convert string location to array of coordinates
    //   eventForm.value.startTime,
    //   eventForm.value.endTime,
    //   eventForm.value.description,

    //   );

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

}
