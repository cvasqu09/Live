const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');

const Event = require('../models/event');
const User = require('../models/user');

/* Routes in this file will be prefixed by <host_name>/api/events */

const categories = ['Chess', 'Baseball', 'Volleyball', 'Disc Golf', 'Basketball'];

/* Route to retrieve all events */
router.get('/', function (req, res, next) {
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    Event.find(function (err, events) {
      if (err) {
        return res.status(500).json({
          title: '500 Internal Server Error',
          message: 'Error occurred while getting event'
        });
      }
      return res.status(200).json(events);
    });
  } else {
    var parsedCategories = req.query['categories'].split(',');
    // Validate categories exist
    for (var i = 0; i < parsedCategories.length; i++) {
      category = parsedCategories[i];
      if (!categories.includes(category)) {
        return res.status(400).json({
          title: '400 Bad Request',
          message: 'Error occurred while getting event'
        });
      }
    }

    Event.find({ 'categories.name': { '$in': parsedCategories } }, function (err, events) {
      if (err) {
        return res.status(500).json({
          title: '500 Internal Server Error',
          message: 'Error occurred while getting event'
        });
      }
      return res.status(200).json(events);
    });
  }
});

/* Retrieve a single event by id. The body-parser library will extract the id
   from the end of the url so that we can use it when searching Mongo collection */
router.get('/:_id', function (req, res, next) {
  Event.findById(req.params._id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: 'Error occurred retrieving id. Be sure to use a valid 24 hex string.',
        message: err
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'No event found'
      });
    }

    res.status(200).json(event);
  });
});

/* Used to create a new event */
router.post('/', function (req, res, next) {
  var event = new Event(req.body);
  id = mongoose.Types.ObjectId();
  event._id = id;

  User.findById(event.eventOwner, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'Error finding the event '
      });
    }

    if (user == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'No event found'
      });
    }

    // If user has too many strikes throw an error
    if (user.strikes >= 3) {
      return res.status(403).json({
        title: '403 Blacklisted',
        message: 'Too many strikes. You\'re out!'
      });
    } else {
      event.save(function (err, result) {
        if (err) {
          return res.status(400).json({
            title: '400 Error',
            error: err,
            message: 'Bad request sent'
          });
        }

        res.status(201).json(result);
      });
    }
  });
});

/* Used to retrieve the rsvp users for a given event */
router.get('/:event_id/rsvpUsers', function (req, res, next) {
  Event.findById(req.params.event_id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: 'Error occurred while retrieving rsvp users',
        message: err
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'No event found'
      });
    }

    res.status(200).json(event.rsvps.rsvpUsers);
  }).populate('rsvps.rsvpUsers');
});

/* Retrieve the eventOwner for a given event */
router.get('/:event_id/eventOwner', function (req, res, next) {
  Event.findById(req.params.event_id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: 'Error occurred while retrieving event owner',
        message: err
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'No event found'
      });
    }

    res.status(200).json(event.eventOwner);
  }).populate('eventOwner');
});

/* Used to edit an event with an id */
router.patch('/:_id', function (req, res, next) {
  Event.findByIdAndUpdate(req.params._id, req.body, { new: true, runValidators: true }, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal Server Error',
        message: 'Error occurred while patching event'
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        message: 'Event not found'
      });
    }

    res.status(200).json(event);
  });
});

/* Used to delete an event with a given id */
router.delete('/:_id', function (req, res, next) {
  Event.findById(req.params._id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal Server Error',
        message: 'Error occurred while trying to delete event'
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        error: 'Event with the given ID not found.'
      });
    }

    Event.findByIdAndRemove({ _id: req.params._id }, function (err, deletedEvent) {
      if (err) {
        return res.status(500).json({
          title: '500 Internal Server Error',
          error: err,
          message: 'Error occurred while trying to delete event'
        });
      }

      res.status(200).json(deletedEvent);
    });
  });
});

// Used to report events
router.post('/:_id/report', function (req, res, next) {
  Event.findById(req.params._id, function (err, event) {
    if (err) {
      return res.status(500).json({
        title: '500 Internal Server Error',
        message: 'Error occurred while trying to delete event'
      });
    }

    if (event == null) {
      return res.status(404).json({
        title: '404 Error',
        error: 'Event with the given ID not found.'
      });
    }

    event.reports++;
    // Delete the event if too many reports
    const endpoint = (req.protocol + '://' + req.headers.host + '/api/events/' + event._id);
    if (event.reports >= 3) {
      console.log(endpoint);
      request.delete(endpoint, function (error, response, body) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            title: 'Error during report deletion',
            message: error
          });
        } else {
          return res.status(200).json(JSON.parse(body));
        }
      });
    } else {
      const headers = [
        {
          name: 'content-type',
          value: 'application/json'
        }
      ];

      console.log(event.reports);
      request.patch({ url: endpoint, headers: headers, json: { 'reports': event.reports } }, function (error, response, body) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            title: 'Error updating number of reports',
            message: error
          });
        } else {
          return res.status(200).json(body);
        }
      });
    }
  });
});

module.exports = router;
