import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service'
import { UserService } from '../user/user.service'
import { User } from '../user/user.model'

@Component({
  selector: 'app-test-message-service',
  templateUrl: './test-message-service.component.html',
  styleUrls: ['./test-message-service.component.css'],
  providers: [UserService, MessagingService]
})
export class TestMessageServiceComponent implements OnInit {
	user: User;

  constructor(private userService: UserService, private msgService: MessagingService) {}

  ngOnInit() {
  	var userId = localStorage.getItem('user_id')
  	console.log(userId)
  	this.userService.getUserInfo(userId).subscribe((user) => {
			this.user = user;	
		})
  }

  onSendText() {
    this.msgService.sendNotificationTexts().subscribe()
  }

}
