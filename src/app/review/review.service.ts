import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Review } from './review.model';
import { environment } from '../../environments/environment'
import { ErrorService } from '../error/error.service';

@Injectable()
export class ReviewService {
	baseURL = `${environment.domain_name}/api/review/`;

  constructor(private http: Http) {}

  submitReview(review: Review): Observable<any> {
  	return this.http.post(this.baseURL, review)
  		.map((response: Response) => {
  			return {title: "Submitted", message: "Review successfully submitted"};
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error.json());
  		})
  }

}
