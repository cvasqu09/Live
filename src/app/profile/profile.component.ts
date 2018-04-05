import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { Event } from '../event/event.model';
import { AuthService } from '../auth.service';
import { IceNumberComponent } from '../ice-number/ice-number.component';
import { ICENumber } from '../ice-number/ice-number.model'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
	user: User;

  constructor(
    private userService: UserService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    var id = localStorage.getItem("user_id")
    this.userService.getUserInfo(id).subscribe((user) => {
      this.user = user   
    })
  }

}
