var express = require('express');
var router = express.Router();

var Event = require('../models/event');

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
      console.error(err)
      next(err);
    });
});
