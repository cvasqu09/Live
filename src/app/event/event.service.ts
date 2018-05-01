import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { Event } from './event.model';
import { environment } from '../../environments/environment'

import 'rxjs/Rx';

@Injectable()
export class EventService {
	baseURL = `${environment.domain_name}/api/events/`;
  eventSent = new BehaviorSubject<Event>(null);
  eventObs = this.eventSent.asObservable();

  sendNotification(event: Event){
    this.eventSent.next(event);
  }


  constructor(private http: Http) {

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

  // Get events by category
  getEventsWithCategories(categories: Array<any>): Observable<any> {
    if(categories.length == 0){
     this.getAllEvents();
    }

    var queryCategories = []
    for (let category of categories){
      queryCategories.push(category.name)
    }

    return this.http.get(this.baseURL + '?categories=' + queryCategories.join())
      .map((response: Response) => {
        return response;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
      
    // return this.http.get(url + '?categories=' + )
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

  // Report Event
  reportEvent(eventId: string){
    return this.http.post(this.baseURL + eventId + '/report', eventId)
            .map((response: Response) => {
              return this.transformIntoEventModel(response);
            })
            .catch((error: Response) => {
              return Observable.throw(error.json());
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


  // Get RSVP users
  getRsvpUsers(eventId: string): Observable<any> {
    return this.http.get(this.baseURL + eventId + '/rsvpUsers')
      .map((response: Response) => {
        return response;
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  // Get Event Owner
  getEventOwner(eventId: string): Observable<any> {
    return this.http.get(this.baseURL + eventId + '/eventOwner')
      .map((response: Response) => {
        return response.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error.json());
      })
  }

  private transformIntoEventModel(response: Response): Event {
  	const res = response.json();
  	return new Event(
  		res.eventName,
  		res.categories,
  		res.numPeople,
			res.address,
  		res.location,
  		res.start,
  		res.end,
  		res.description,
  		res.eventOwner,
  		res._id,
  		res.rsvps,
      res.reports
  	)
  }
}
