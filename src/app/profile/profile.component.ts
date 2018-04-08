import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
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
  currentICENumbers: Array<ICENumber>;

  constructor(
    private userService: UserService,
    public auth: AuthService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    var id = localStorage.getItem("user_id")
    this.userService.getUserInfo(id).subscribe((user) => {
      this.user = user
    })
  }

  onEditProfile() {
    console.log("editing profile")
    // Logic for sending edited user information
    var changes: Object = {};

    // Initialize changes object to have selected categories and current Ice numbers
    changes = {"categories": "testcat"/*this.selectedCategories*/, "ICENumbers": [{phoneNumber:"5555555555", provider:"verizon", confirmed: true}]/*this.currentICENumbers*/}

    this.userService.editUser(this.user_id, changes).subscribe(user => {
      // use toaster service to create a success alert
      const notification: ToasterNotification = new ToasterNotification("Success", "Boo Yah! Your changes have been made.", ToasterNotification.SUCCESS)
      this.toasterService.sendNotification(notification)
    }, err => {
      // user toaster service to create a error alert
      const notification: ToasterNotification = new ToasterNotification("Error", "Sorry, I could not save your changes.", ToasterNotification.ERROR)
      this.toasterService.sendNotification(notification)

    })
  }

}
