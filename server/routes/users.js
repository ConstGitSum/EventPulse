var express = require('express');
var router = express.Router();

var User = require('../models/user');

module.exports = router;

// *** GET user by id *** //
router.get('/:id', function(req, res, next) {
  User.getUserById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    });
});

// *** POST new user *** //
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
