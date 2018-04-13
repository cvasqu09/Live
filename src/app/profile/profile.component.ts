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
    this.user_id = localStorage.getItem("user_id")
    this.userService.getUserInfo(this.user_id).subscribe((user) => {
      this.user = user  
      this.selectedCategories = user.categories
    })
  }

  updateCategories(categories: Array<string>) {
    this.selectedCategories = categories;
  }
}
