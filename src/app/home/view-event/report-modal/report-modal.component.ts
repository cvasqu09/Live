import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '../../../event/event.model'
import { EventService } from '../../../event/event.service'
import { ReportService } from './report.service'
import { Report } from './report.model'

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent implements OnInit {
	@ViewChild('reportModalButton') reportModalButton: ElementRef;
	@Input() currentEvent: Event;
	eventOwner: string;
	report: string = "";
  reportSubmitted: boolean = false;
  errorOccurred: boolean = false;
  error: string;

  constructor(private eventService: EventService, private reportService: ReportService) { }

  ngOnInit() {
  }

  openModal(): void {
  	this.eventService.getEventOwner(this.currentEvent._id).subscribe(res => {
  		this.eventOwner = res.fullName;
  	}, err => {
  		console.log('Error retrieving event owner: ' + err);
  	})
    this.report = "";
    this.reportSubmitted = false;
    this.errorOccurred = false;
  	this.reportModalButton.nativeElement.click();
  }

  valid(): boolean {
  	if(this.report.length < 20 || this.report.length > 120){
  		return false;
  	}
  	return true;
  }

  onSubmit(reviewForm: NgForm): void {
  	const userId = localStorage.getItem('user_id')
  	const newReport: Report = new Report(this.report, this.currentEvent._id, userId)
  	console.log("submitting report: " + JSON.stringify(newReport));

    // Send the report
  	this.reportService.sendReport(newReport).subscribe(res => {
  		console.log(res);
      this.reportSubmitted = true;
  	}, err => {
  		console.log(err);
      this.errorOccurred = true;
      this.error = err.json().message;
  	})

    // Update the number of rpeorts for the event
    const reports = this.currentEvent.reports + 1;
    this.eventService.editEventWithId(this.currentEvent._id, {"reports": reports}).subscribe(res => {
      console.log("Number of reports updated: " + reports.toString())
    }, err => {
      console.log("error occurred while updatign reports: ")
    })
  }

}
