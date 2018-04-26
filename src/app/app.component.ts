import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from './toaster/toaster.service';
import { ToasterNotification } from './toaster/toaster-notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	router: Router;

  constructor(private _router: Router, private toasterService: ToasterService) {
  	this.router = _router;
  }

  clearNotifications(){
  	const notification = new ToasterNotification("Clear", "Clear", ToasterNotification.CLEAR)
  	this.toasterService.sendNotification(notification);
  }
}
