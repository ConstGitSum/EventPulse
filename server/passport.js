//var LocalStrategy = require('passport-local').Strategy; 
var FacebookStrategy = require('passport-facebook').Strategy;
//var bcrypt = require('bcrypt-nodejs');
var FACEBOOK_ID = '639261402906273'
var FACEBOOK_SECRET = 'fdf4dc317a7332195fb5b2278b522e68'
var FACEBOOK_CALLBACK_URL = 'http://localhost:3000/api/passportFacebook/facebookLogin/Callback'
var PROFILE_FIELDS = ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'photos','verified'] //This is what tells facebook what to return		


module.exports = function(passport) {
	passport.serializeUser(function(user, done) { 
		console.log("SU", user,done)
		done(null, user); 
	});

	passport.deserializeUser(function(id, done) { 
		console.log("DU")
		done(null,id)
	});



	passport.use(new FacebookStrategy({		
		clientID: FACEBOOK_ID,
		clientSecret: FACEBOOK_SECRET,		
		callbackURL: FACEBOOK_CALLBACK_URL,
		profileFields: PROFILE_FIELDS
	}, function(token, refreshToken, profile, done) {
		process.nextTick(function() {
			console.log("profile",profile,token)
			done(null,token)
		})

	}))
}
