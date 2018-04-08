import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ToasterNotification } from './toaster-notification.model';

export class ToasterService {
	notificationSent = new BehaviorSubject<ToasterNotification>(null);
	notificationObs = this.notificationSent.asObservable();

	constructor(){

	}

	sendNotification(notification: ToasterNotification){
		console.log("sending notification: " + JSON.stringify(notification))
		this.notificationSent.next(notification);
		console.log("next value: " + JSON.stringify(this.notificationSent.getValue()))
	}
}
