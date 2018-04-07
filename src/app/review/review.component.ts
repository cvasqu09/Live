import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewService } from "./review.service";
import { Review } from "./review.model";


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
  providers: [ReviewService]
})
export class ReviewComponent implements OnInit {

  userSubmittedReview: boolean = false;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {

    // TODO: Check if user already submitted. If so change userSubmittedReview value to true
  }

  userSumbittedReview(): boolean {

    return this.userSubmittedReview;
  }

  onSubmit(reviewForm: NgForm){

    // Store this info...
    console.log(reviewForm.value.reviewText);
    console.log(localStorage.getItem('user_id'));
    const reviewText: string = reviewForm.value.reviewText;
    const userId: string = localStorage.getItem('user_id');

    const review: Review = new Review(reviewText, userId);
    this.reviewService.submitReview(review).subscribe(msg => {
      
    })


    this.userSubmittedReview = true;
  }
}
