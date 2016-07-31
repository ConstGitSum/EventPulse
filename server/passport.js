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
      User.getUserByFacebookId(profile.id).then(function(value){
        if(value.length==0){
          let user = {name: (profile.name.givenName + ' '+profile.name.familyName), email: profile.emails[0].value, image: profile.photos[0].value,facebook_id: profile.id} //name, email,image, facebook_id
          User.create(user).then(function(user_id){
            User.addGroup().then(function(group_id){
               User.addMemberships({user1_id: user_id[0], group_id: group_id[0], rank: 'owner'}).then(function(){
                 Promise.all(profile._json.friends.data.map(function(friend){
                   return User.getUserByFacebookId(friend.id)
                 })
                 ).then(function(friendArrayArray){   //This returns an double array [[{}]]
                   var friendsValues = friendArrayArray[0].map(function(eachFriend){
                   return {user1_id: eachFriend.id, group_id: group_id[0], rank: 'member'}  
                   })
                   User.addMemberships(friendsValues).then(function(){
                    console.log("Boo YA")
                   })
                 })
               })
            })
          })
        }else{
          console.log("already in database",profile) //Check to see if you have new friends since last time
          console.log("the value",value)   
          var yourFriends = profile._json.friends.data//grab friends
          var your_id = value[0].id;                  //grab your user id
          console.log("friendssss",yourFriends)
          User.getMemberships(your_id).then(function(value){
            console.log("value",value)
            User.getMemberList(value[0].group_id).then(function(value){
              console.log("Everybody in group",value)
            })
          })
          //grab friends from memberships db
          //check for any missing
          //if missing, add them.       

        }
      })
      done(null,token)
    });
  }));
};
