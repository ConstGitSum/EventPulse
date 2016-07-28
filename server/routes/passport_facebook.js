var express = require('express');
var router = express.Router();

var passport = require('passport');

module.exports = router;

// *** GET all events *** //
router.get('/facebookLogin', passport.authenticate('facebook', {		
	scope: ['user_friends','email']		
}));

router.get('/facebookLogin/Callback', passport.authenticate('facebook', {		
	successRedirect: '/',			
	failureRedirect: '/'						
}))