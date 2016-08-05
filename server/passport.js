var FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_ID = process.env.FACEBOOK_ID;
const FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;
const FACEBOOK_CALLBACK_URL = 'http://localhost:3000/api/passportFacebook/facebookLogin/Callback'
const PROFILE_FIELDS = ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'picture.type(small)', 'verified', 'friends'] //This is what tells facebook what to return		

var User = require('./models/user');
var PassportHelper = require('./passport_helper')

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    console.log('user',user)
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    console.log('id',id)
    done(null, id);
  });

  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: PROFILE_FIELDS
  }, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      PassportHelper.passport_helper(token, profile)
        .then((value) => {
          done(null, value);
        });
    });
  }));

};
