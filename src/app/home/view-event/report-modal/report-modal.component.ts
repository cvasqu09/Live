import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Event } from '../../../event/event.model'
import { EventService } from '../../../event/event.service'

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent implements OnInit {
	@ViewChild('reportModalButton') reportModalButton: ElementRef;
	@Input() currentEvent: Event;
	eventOwner: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  openModal(){
  	this.eventService.getEventOwner(this.currentEvent._id).subscribe(res => {
  		this.eventOwner = res.fullName;
  	}, err => {
  		console.log('Error retrieving event owner: ' + err);
  	})
  	this.reportModalButton.nativeElement.click();
  }

}
