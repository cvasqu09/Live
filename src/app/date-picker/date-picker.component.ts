import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
	// Used to emit the date that changed to the parent component
	@Output() dateEmitter: EventEmitter<{year: number, month: number, day: number}> = new EventEmitter<{year: number, month: number, day: number}>();
	model: NgbDateStruct;

	
  constructor() { }

  ngOnInit() {
  }

  selectToday() {
 	  this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
	}

	onDateChange(change) {
		console.log("Emitting")
		console.log(JSON.stringify(change))
		this.dateEmitter.emit(change)
	}
}
