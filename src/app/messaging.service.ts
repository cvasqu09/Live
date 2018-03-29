import 'rxjs/Rx';
import { Http, Response, Headers } from "@angular/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from './user/user.model';
import { environment } from '../environments/environment';
import { ErrorService } from './error/error.service';
import { Error } from './error/error.model';

@Injectable()
export class MessagingService{
  constructor(private http: Http, private errorService: ErrorService) {}

  // Given a user's id, this will send notification texts to the provided user's ICE Numbers 
  sendNotificationTexts(){
    var id = localStorage.getItem("user_id");
  	return this.http.post(`${environment.domain_name}/api/sms/`, {"id": id})
  		.map((response) => {
  			const res = response.json();
  			console.log(res);
  			return res;
  		})
  		.catch((error: Response) => {
        this.errorService.emitError(error);
  			return Observable.throw(error);
  		})
  }

}