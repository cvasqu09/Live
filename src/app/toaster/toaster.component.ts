import { Component, OnInit } from '@angular/core';
import { ToasterNotification } from './toaster-notification.model';
import { ToasterService } from './toaster.service';
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})

export class ToasterComponent implements OnInit {
  notifications: Array<ToasterNotification> = new Array<ToasterNotification>();

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.toasterService.notificationObs.subscribe((notification: ToasterNotification) => {
      if(notification !== null){ 
        const newNotification = new ToasterNotification(notification.title, notification.message, notification.type)
        console.log("Received new notification");
        this.notifications.push(newNotification)
      }
    }, (err) => {
      const errorNotification = new ToasterNotification(err.title, err.message, ToasterNotification.ERROR)
      this.notifications.push(errorNotification)
    }, () => {
      console.log('Completed');
    })
  }

  getAlertClass(type: number){
    switch(type){
      case ToasterNotification.SUCCESS: {
        return {'alert-success': true}
      }

      case ToasterNotification.ERROR: {
        return {'alert-danger': true}
      }

      default: {
        return {'alert-danger': true}
      }
    }
  }

  onClose(index){
    this.notifications.splice(index, 1);
  }

}
