import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild, ElementRef} from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit, OnChanges {
	// Used to emit the date that changed to the parent component
	@Input() formReset: boolean;
	@ViewChild('datepicker') datePicker: ElementRef;
	@Output() dateEmitter: EventEmitter<{year: number, month: number, day: number}> = new EventEmitter<{year: number, month: number, day: number}>();
	model: NgbDateStruct;

  constructor() { }

  ngOnInit() {
  }

  // Called when @Input is changed. formReset is changed in the event component when submitting the form is successful
  ngOnChanges() {
  	if(this.formReset == true){
  		// Reset the dates since this is not automatically handled with resetting the form
 			this.datePicker._elRef.nativeElement.value = "";
  	}
  }

  selectToday() {
 	  this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
 	  this.onDateChange(this.model);
	}

	onDateChange(change) {
		this.dateEmitter.emit(change)
	}
}
