var express = require('express');
var axios = require('axios');
var router = express.Router();

var Event = require('../models/event');
var User = require('../models/user');
var Guest = require('../models/guest');
var Hide = require('../models/hidden_event');
var utils = require('../utils/utils');
var checkUpdateId = require('../middlewares/index').checkUpdateId;

module.exports = router;

// *** GET all events *** //
router.get('/', function(req, res, next) {
  utils.queryHandler(Event.getAll, null, req, res, next);
});

// *** GET event by id *** //
router.get('/:id', function(req, res, next) {
  utils.queryHandler(Event.getEventById, req.params.id, req, res, next);
});

// *** GET guests for event *** //
router.get('/:id/guests', function(req, res, next) {
  utils.queryHandler(Guest.getGuests, req.params.id, req, res, next);
});

// *** POST guest for event *** //
router.post('/:id/guests', function(req, res, next) {
  const userId = req.body.user_id;
  const eventId = req.params.id;

  // get current guest list
  // if user is already guest, send 422 (unprocessable entity)
  Guest.getGuests(eventId)
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

// *** PUT - update guest status *** //
router.put('/:eventId/guests/:userId', checkUpdateId, function(req, res, next) {
  const userId = +req.params.userId;
  const eventId = +req.params.eventId;

  Guest.update(eventId, userId, req.body.status)
    .then((guest) => {
      res.status(200).json(guest[0]);
    })
    .catch((err) => {
      next(err);
    });
});

// *** DELETE guest for event *** //
router.delete('/:eventId/guests/:userId', function(req, res, next) {
  const userId = +req.params.userId;
  const eventId = +req.params.eventId;

  // get current guest list
  // if user is not a guest, send 422 (unprocessable entity)
  // else delete guest, and return guest's user object
  Guest.getGuests(eventId)
    .then((guests) => {
      if (guests.some(e => e.id === userId)) {
        Guest.deleteGuest(eventId, userId)
          .then(() => {
            return User.getUserById(userId);
          })
          .then((user) => {
            res.status(200).json(user[0]);
          })
          .catch((err) => {
            next(err);
          });
      } else {
        res.status(422).json({
          error: 'User is not a guest'
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

// *** POST new event *** //
router.post('/', function(req, res, next) {
  // geocode entered address and send 422 if invalid
  utils.getCoords(req.body)
    .then(newEvent => Event.create(newEvent))
    .then(eventId => Event.getEventById(eventId[0].id))
    .then(event => 
      Guest.getGuests(event[0].id)
        .then(guests => {
          event[0].guests = guests;
          res.status(201).json(event[0]);
        })
    )
    .catch((err) => {
      next(err);
    });
});

// *** PUT - update event *** //
router.put('/:id', checkUpdateId, function(req, res, next) {
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

// *** POST new hidden event *** //
router.post('/:id/hide', function(req, res, next) {
  Hide.hide(req.params.id, req.body.user_id)
    .then((hidden) => {
      res.status(201).json(hidden[0]);
    })
    .catch((err) => {
      next(err);
    });
});

// *** DELETE new hidden event *** //
router.delete('/:id/hide', function(req, res, next) {
  Hide.hide(req.params.id, req.body.user_id)
    .then(() => {
      res.status(200).json({ status: 'deleted' });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/:id/chat', function(req,res,next) {
  console.log(req.body)
  //Event.addChatMessage(req.body)
})
