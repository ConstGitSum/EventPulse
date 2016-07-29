var express = require('express');
var passport = require('passport');
var router = express.Router();

module.exports = router;

router.get('/facebookLogin', passport.authenticate('facebook', {		
  scope: ['user_friends', 'email']		
}));

router.get('/facebookLogin/Callback', passport.authenticate('facebook', {		
  successRedirect: '/',			
  failureRedirect: '/'						
}))
