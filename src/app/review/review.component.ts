import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  userSubmittedReview: boolean = false;

  constructor() { }

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
    this.userSubmittedReview = true;
  }
}
