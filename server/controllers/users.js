var express = require('express');
var router = express.Router();

var utils = require('../utils/utils');
var User = require('../models/user');

module.exports = router;

// *** GET user by id *** //
router.get('/:id', function(req, res, next) {
  utils.queryHandler(User.getUserById, req.params.id, req, res, next);
});

// *** POST new user *** //
router.post('/', function(req, res, next) {
  User.create(req.body)
    .then((userId) => {
      console.log('USER',userId)
      return User.getUserById(userId[0]);
    })
    .then((event) => {
      res.status(201).json(event[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/getMemberships/:id', function(req, res, next) {
  utils.queryHandler(User.getMemberships, req.params.id, req, res, next);
});

router.get('/getFriendsListId/:id', function(req, res, next) {
  utils.queryHandler(User.getFriendsListId, req.params.id, req, res, next);
});

router.get('/getMemberList/:group_id',function(req, res, next) {
  utils.queryHandler(User.getMemberList, req.params.group_id, req, res, next);
});

router.post('/addGroup',function(req, res, next) {
  utils.queryHandler(User.addGroup, req.body.groupName, req, res, next);
});

router.post('/addMemberships', function(req, res, next) {
  utils.queryHandler(User.addMemberships, req.body, req, res, next);
});
