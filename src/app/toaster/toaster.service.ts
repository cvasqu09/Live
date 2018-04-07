import { EventEmitter } from '@angular/core';
import { ToasterNotification } from './toaster-notification.model';

export class ToasterService {
	emitter = new EventEmitter<ToasterNotification>();
  
	emitNotification(notification: ToasterNotification){
		this.emitter.emit(notification);
	}

}
