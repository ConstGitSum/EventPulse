const express = require('express');
const passport = require('passport');

const PassportHelper = require('../passport_helper');

const router = express.Router();

module.exports = router;

router.get('/facebookLogin', passport.authenticate('facebook', {
  scope: ['user_friends', 'email'],
}));

router.get('/facebookLogin/Callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
}));

router.post('/testPassport', function (req, res, next) {
  PassportHelper.passport_helper(req.body.token, req.body.profile, req.body.done)
    .then((info) => {
      res.status(201).json(info);
    });
});
