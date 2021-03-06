const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Review = require('../models/review');

/* Used to post a review */
router.post('/', function (req, res, next) {
  var review = new Review(req.body);
  Review.find()
    .where('userId').equals(review.userId)
    .exec(function (error, reviews) {
      if (error) {
        return res.status(500).json({
          title: 'Error occurred retrieving info from backend',
          message: error
        });
      }

      // If reviews for the given user_id are retrieved
      if (Object.keys(reviews).length !== 0) {
        return res.status(409).json({
          title: 'Error occurred',
          message: 'Already submitted a review'
        });
      }

      review.save(function (err, result) {
        if (err) {
          return res.status(400).json({
            title: '400 Error',
            error: err,
            message: 'Bad request sent'
          });
        }

        res.status(201).json(result);
      });
    });
});

module.exports = router;
