import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from "./review.service";
import { Review } from "./review.model";
import { ToasterNotification } from "../toaster/toaster-notification.model";
import { ToasterService } from "../toaster/toaster.service";


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  userSubmittedReview: boolean = false;

  constructor(private reviewService: ReviewService, private toasterService: ToasterService) { }

  ngOnInit() {

    // TODO: Check if user already submitted. If so change userSubmittedReview value to true
  }

  userSumbittedReview(): boolean {

    return this.userSubmittedReview;
  }

  onSubmit(reviewForm: NgForm){

    // Store this info...
    const reviewText: string = reviewForm.value.reviewText;
    const userId: string = localStorage.getItem('user_id');

    const review: Review = new Review(reviewText, userId);
    this.reviewService.submitReview(review).subscribe(msg => {
      const notification: ToasterNotification = new ToasterNotification(msg.title, msg.message, ToasterNotification.SUCCESS);
      // Send notification to the service
      console.log("Sending notification: " + JSON.stringify(notification));
      this.toasterService.sendNotification(notification);
    }, err => {
      const notification: ToasterNotification = new ToasterNotification(err.title, err.message, ToasterNotification.ERROR)
      this.toasterService.sendNotification(notification)
    })


    this.userSubmittedReview = true;
  }
}
