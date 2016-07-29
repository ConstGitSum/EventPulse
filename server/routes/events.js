var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var User = require('../models/user');

module.exports = router;

// *** GET all events *** //
router.get('/', function(req, res, next) {
  Event.getAll()
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      next(err);
    });
});

// *** GET event by id *** //
router.get('/:id', function(req, res, next) {
  Event.getEventById(req.params.id)
    .then((event) => {
      res.status(200).json(event);
    })
    .catch((err) => {
      next(err);
    });
});

// *** GET guests for event *** //
router.get('/:id/guests', function(req, res, next) {
  User.getGuests(req.params.id)
    .then((guests) => {
      res.status(200).json(guests);
    })
    .catch((err) => {
      next(err);
    });
});

// *** POST new event *** //
router.post('/', function(req, res, next) {
  Event.create(req.body)
    .then((eventId) => {
      return Event.getEventById(eventId[0]);
    })
    .then((event) => {
      res.status(201).json(event[0]);
    })
    .catch((err) => {
      next(err);
    });
});

// *** PUT - update event *** //
router.put('/:id', function(req, res, next) {
  if (req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field'
    });
  }

  Event.update(req.params.id, req.body)
    .then((eventId) => {
      return Event.getEventById(eventId[0]);
    })
    .then((event) => {
      res.status(200).json(event[0]);
    })
    .catch((err) => {
      next(err);
    });
});

// *** DELETE event *** //
router.delete('/:id', function(req, res, next) {
  // get event, then delete if exists, return deleted event
  Event.getEventById(req.params.id)
    .then((event) => {
      Event.deleteEvent(req.params.id)
        .then(() => {
          res.status(200).json(event[0]);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
});
