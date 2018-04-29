import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Event } from './event.model';
import { environment } from '../../environments/environment'
import { UserService } from '../user/user.service'

import 'rxjs/Rx';

@Injectable()
export class EventService {
	baseURL = `${environment.domain_name}/api/events/`;

  constructor(private http: Http, private userService: UserService) {

  }

  getAllEvents(): Observable<any> {
    return this.http.get(this.baseURL)
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  // Get EventById
  getEventById(eventId: string): Observable<any> {
  	return this.http.get(this.baseURL + eventId)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response);
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json())
  		})
  }


  // Create Event
  createEvent(event: Event): Observable<any> {
  	return this.http.post(this.baseURL, event)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response)
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json())
  		})
  }

  // Delete Event
  deleteEventWithId(eventId: string): Observable<any> {
  	return this.http.delete(this.baseURL + eventId)
  		.map((response:Response) => {
  			return this.transformIntoEventModel(response)
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json());
  		})
  }

  // Delete Outdated Events
  deleteOutdatedEvent(event: Event){
    const currentTime = new Date() 
    if (event.end < currentTime){
      //give strikes
      var absentUsers = rsvpUsers.filter(user => !presentUsers.includes(user))
      for (count = 0; count < absentUsers.length; count++){
        this.userService.reportUser(absentUsers[count]._id).subscribe(res =>{
          console.log("User Reported")
        }, err =>{
          console.log("Error reporting user")
        })
      }
      this.deleteEventWithId(event._id).subscribe()
    }
  }

  // Report Event
  reportEventWithId(eventId: string): Observable<any> {
  	return this.getEventById(eventId).flatMap((event: Event) => {
  		const reports = event.reports++;
  		return this.http.patch(this.baseURL + eventId, {"reports": reports})
  			.map((response: Response) => {
  				return this.transformIntoEventModel(response);
  			})
  			.catch((error: Response) => {
  				return Observable.throw(error)
  			})
  	})
  }

  // Edit Event
  editEventWithId(eventId: string, changes: object): Observable<any> {
  	return this.http.patch(this.baseURL + eventId, changes)
  		.map((response: Response) => {
  			return this.transformIntoEventModel(response);
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json());
  		})
  }


  // update event

  private transformIntoEventModel(response: Response): Event {
  	const res = response.json();
  	return new Event(
  		res.eventName,
  		res.categories,
  		res.numPeople,
			res.address,
  		res.location,
  		res.startTime,
  		res.endTime,
  		res.description,
  		res.eventOwner,
  		res._id,
  		res.reports
  	)
  }
}
