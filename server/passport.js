var FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_ID = '639261402906273'
const FACEBOOK_SECRET = 'fdf4dc317a7332195fb5b2278b522e68'
const FACEBOOK_CALLBACK_URL = 'http://localhost:3000/api/passportFacebook/facebookLogin/Callback'
const PROFILE_FIELDS = ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'picture.type(large)','verified','friends'] //This is what tells facebook what to return		
var User = require('./models/user');

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
      console.log("friends",profile._json.friends.data)
      User.getUserByFacebookId(profile.id).then(function(value){
        console.log("VALUE",value.length)
        if(value.length==0){
          let user = {name: (profile.name.givenName + ' '+profile.name.familyName), email: profile.emails[0].value, image: profile.photos[0].value,facebook_id: profile.id} //name, email,image, facebook_id
          console.log("USER",user)
          User.create(user).then(function(value){
            console.log("added",value) //return user ID
            User.addGroup().then(function(group_id){
              console.log("hey now",group_id,value[0])
               User.addMemberships({user1_id: value[0], group_id: group_id[0], rank: 'owner'}).then(function(value){
                console.log("this value",value)
                 Promise.all(profile._json.friends.data.map(function(friend){
                   return User.getUserByFacebookId(friend.id)
                 })
                 ).then(function(values){
                  console.log("these are what I got",values)
                   var friendsValues = values[0].map(function(value){
                   return {user1_id: value.id, group_id: group_id[0], rank: 'member'}  
                   })
                   console.log("friendValues",friendsValues)
                   User.addMemberships(friendsValues).then(function(value){
                    console.log("WHY ISNT THIS WORKING")
                   })
                 })
               })
            })
          })
        }else{
          console.log("already in database")

        }
      })
      done(null,token)
    });
  }));
};
