import { Component, OnInit } from '@angular/core';
import { ToasterNotification } from './toaster-notification.model';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  providers: [ToasterService]
})
export class ToasterComponent implements OnInit {
	title: string;
	msg: string;

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
  	this.toasterService.emitter.subscribe(notification => {
  		this.title = notification.title;
  		this.msg = notification.msg;
  		
  	})
  }

}
