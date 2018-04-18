import { Component, OnInit, Input } from '@angular/core';
import { ICENumber } from './ice-number.model'

@Component({
  selector: 'app-ice-number',
  templateUrl: './ice-number.component.html',
  styleUrls: ['./ice-number.component.css']
})
export class IceNumberComponent implements OnInit {
	@Input() number: ICENumber;

  constructor() { }

  ngOnInit() {
  }

}
