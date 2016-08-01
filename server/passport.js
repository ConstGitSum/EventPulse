var FacebookStrategy = require('passport-facebook').Strategy;
const FACEBOOK_ID = '639261402906273'
const FACEBOOK_SECRET = 'fdf4dc317a7332195fb5b2278b522e68'
const FACEBOOK_CALLBACK_URL = 'http://localhost:3000/api/passportFacebook/facebookLogin/Callback'
const PROFILE_FIELDS = ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'picture.type(large)', 'verified', 'friends'] //This is what tells facebook what to return		
var User = require('./models/user');
var PassportHelper = require('./passport_helper')
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id)
  });

  passport.use(new FacebookStrategy({
    clientID: FACEBOOK_ID,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: PROFILE_FIELDS
  }, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      PassportHelper.passport_helper(token,profile)
      .then((value) => {
        done(null,token)
      })
      //addFriendsToDatabase(token,profile,done);
      // User.getUserByFacebookId(profile.id).then(function(value) {
      //   if (value.length === 0) {
      //     let user = {
      //         name: (profile.name.givenName + ' ' + profile.name.familyName),
      //         email: profile.emails[0].value,
      //         image: profile.photos[0].value,
      //         facebook_id: profile.id
      //       } //name, email,image, facebook_id
      //     User.create(user).then(function(user_id) {
      //       User.addGroup().then(function(group_id) {
      //         User.addMemberships({
      //           user1_id: user_id[0],
      //           group_id: group_id[0],
      //           rank: 'owner'
      //         }).then(function() {
      //           Promise.all(profile._json.friends.data.map(function(friend) {
      //             return User.getUserByFacebookId(friend.id)
      //           })).then(function(friendArrayArray) { //This returns an double array [[{}]]
      //             var friendsValues = friendArrayArray[0].map(function(eachFriend) {
      //               return {
      //                 user1_id: eachFriend.id,
      //                 group_id: group_id[0],
      //                 rank: 'member'
      //               }
      //             })
      //             User.addMemberships(friendsValues).then(function() {
      //               console.log("Boo YA")
      //               done(null, token)
      //             })
      //           })
      //         })
      //       })
      //     })
      //   } else {
      //     var yourFriends = profile._json.friends.data //grab friends
      //     var your_id = value[0].id; //grab your user id
      //     User.getFriendsListId(your_id).then(function(friendsListId) { //grab friends list ID from database
      //       User.getMemberList(friendsListId[0].id).then(function(members) { //grab your friends list from database using the ID
      //         if (members.length < yourFriends.length) { // if your facebook friends list is > than what is in your database
      //           var newFriends = yourFriends.filter(function(friend) { //filter out all friends in your facebook friends list that are already in database
      //             var friendNotInDatabase = true;
      //             for (var i = 0; i < members.length; i++) {
      //               if (members[i].facebook_id === friend.id) {
      //                 friendNotInDatabase = false;
      //               }
      //             }
      //             return friendNotInDatabase
      //           })
      //           Promise.all(newFriends.map(function(friend) { //Take all the new friends and grab their user_id by using their facebook id
      //             return User.getUserByFacebookId(friend.id)
      //           })).then(function(friendArrayArray) { //Take all the new friends and format them for database entry
      //             var friendsValues = friendArrayArray[0].map(function(eachFriend) {
      //               return {
      //                 user1_id: eachFriend.id,
      //                 group_id: friendsListId[0].id,
      //                 rank: 'member'
      //               }
      //             })
      //             User.addMemberships(friendsValues).then(function() { //Add them to the database
      //               console.log("bam wam!")
      //               done(null, token)
      //             })
      //           })
      //         } else {
      //           done(null, token)
      //         }
      //       })
      //     })
      //   }
      // })
    });
  }));
};
