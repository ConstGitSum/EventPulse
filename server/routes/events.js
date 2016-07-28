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
      next(error);
    });
});
