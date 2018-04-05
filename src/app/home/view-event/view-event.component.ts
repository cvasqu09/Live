import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  @Input() currentEvent: object = {};

  constructor() {

  }

  ngOnInit() {

  }

  // Retrieve the entire event object
  eventClicked(){
    var viewEventBtn: HTMLElement = document.getElementById("viewEventBtn") as HTMLElement;
    viewEventBtn.click();
  }
}
