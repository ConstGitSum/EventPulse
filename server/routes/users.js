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
  User.create(req.body)
    .then((userId) => {
      return User.getUserById(userId[0]);
    })
    .then((event) => {
      res.status(201).json(event[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/getMemberships/:id', function(req, res, next){
  User.getMemberships(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    })
})
router.get('/getFriendsListId/:id', function(req, res, next){
  User.getFriendsListId(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    }) 
})

router.get('/getMemberList/:group_id',function(req, res, next){
  User.getMemberList(req.params.group_id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/addGroup',function(req, res, next){
  User.addGroup(req.body)
    .then((group) => {
      res.status(201).json(group);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/addMemberships', function(req, res, next){
  User.addMemberships(req.body)
  .then((group) => {
    res.status(201).json(group);
  })
  .catch((err) => {
    next(err);
  })
})
