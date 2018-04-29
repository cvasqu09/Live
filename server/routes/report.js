const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Report = require('../models/report');

/* Used to post a review */
router.post('/', function (req, res, next) {
  var report = new Report(req.body);
  Report.find()
    .where('userId').equals(report.userId)
    .where('eventId').equals(report.eventId)
    .exec(function (error, reports) {
      if (error) {
        return res.status(500).json({
          title: 'Error occurred retrieving info from backend',
          message: error
        });
      }

      // If reviews for the given user_id are retrieved
      if (Object.keys(reports).length !== 0) {
        return res.status(409).json({
          title: 'Error occurred',
          message: 'Already submitted a report'
        });
      }

      report.save(function (err, result) {
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
