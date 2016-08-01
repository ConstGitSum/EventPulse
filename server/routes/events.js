var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var User = require('../models/user');
var Guest = require('../models/guest');

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

// *** POST guest for event *** //
router.post('/:id/guests', function(req, res, next) {
  const userId = req.body.user_id;
  const eventId = req.params.id;

  // get current guest list
  // if user is already guest, send 422 (unprocessable entity)
  User.getGuests(eventId)
    .then((guests) => {
      if (guests.some(e => e.id === userId)) {
        res.status(422).json({
          error: 'User is already a guest'
        });
      } else {
        Guest.create(Object.assign(req.body, { event_id: +eventId }))
          .then((id) => {
            return User.getUserById(id[0]);
          })
          .then((user) => {
            res.status(201).json(user[0]);
          })
          .catch((err) => {
            next(err);
          });
      }
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
