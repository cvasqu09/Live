import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
	static readonly SUCCESS = 1
	static readonly ERROR = 2

	@Input() notification: {message: string, notificationType: number}

  constructor() { }

  ngOnInit() {
  }

  messageTitle(): string {
  	return this.notification.notificationType == 1 ? "Success" : "Error";
  }

}
