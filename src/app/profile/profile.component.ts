import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { EventService } from '../event/event.service';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { AuthService } from '../auth.service';
import { IceNumberComponent } from '../ice-number/ice-number.component';
import { ICENumber } from '../ice-number/ice-number.model'
import { ToasterService } from '../toaster/toaster.service';
import { ToasterNotification } from '../toaster/toaster-notification.model'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
	user: User;
  user_id: string;
  selectedCategories: Array<string>;
  userEventIDs: Array<string>;
  userDetailedEvents: Array<Event>;
  currentICENumbers: Array<ICENumber>;

  constructor(
    private userService: UserService,
    public auth: AuthService,
    private toasterService: ToasterService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.user_id = localStorage.getItem("user_id")
    this.userService.getUserInfo(this.user_id).subscribe((user) => {
      this.user = user
      this.selectedCategories = user.categories
      this.userDetailedEvents = this.getEventDetails(user.eventIds)
    });


  }

  updateCategories(categories: Array<string>) {
    this.selectedCategories = categories;
  }

  public getEventDetails(events: Array<string>): Array<Event>{

    let tempEventList: Array<Event> = []; //Temp Array to store all the found events
    console.log(events);
    for(let detailedEvent of events){
      this.eventService.getEventById(detailedEvent).subscribe((e) => {
        tempEventList.push(e);
      });
    }
    return tempEventList
  }
}
