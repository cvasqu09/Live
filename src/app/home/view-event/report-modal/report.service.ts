import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Report } from './report.model';
import { Observable } from "rxjs";
import { environment } from '../../../../environments/environment'

@Injectable()
export class ReportService {

  constructor(private http: Http) { }

  sendReport(report: Report) {
  	return this.http.post(`${environment.domain_name}/api/report/`, report)
  		.map((response: Response) => {
  			return response.json();
  		})
  		.catch((error: Response) => {
  			return Observable.throw(error);
  		})
  }

}
