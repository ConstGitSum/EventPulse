var User = require('./models/user');
module.exports = {
passport_helper: passport_helper
}
function passport_helper(token, profile) {
return User.getUserByFacebookId(profile.id).then(function(value) {
        if (value.length === 0) { //if the user isn't in the database
          let user = {  //Create a new user object
              name: (profile.name.givenName + ' ' + profile.name.familyName),
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              facebook_id: profile.id
            } //name, email,image, facebook_id
          return User.create(user).then(function(user_id) { //create the user in the database
            return User.addGroup().then(function(group_id) {  // add a new friends group
              return User.addMemberships({  //add the user to the new friends group as the owner
                user1_id: user_id[0],
                group_id: group_id[0],
                rank: 'owner'
              }).then(function() {
                if(profile._json.friends.data.length > 0){  //if the user had friends
                return Promise.all(profile._json.friends.data.map(function(friend) {
                  return User.getUserByFacebookId(friend.id)  //grab the friends from our database
                })).then(function(friendArrayArray) { //This returns an double array [[{}],[{}]]
                  var friendsValues = friendArrayArray.map(function(eachFriend) {  //map all the friends to get ready to insert them to the friends group
                    return {
                      user1_id: eachFriend[0].id,
                      group_id: group_id[0],
                      rank: 'member'
                    }
                  })
                  return User.addMemberships(friendsValues).then(function(friends) {  //add the users to the friends group
                    return [{user_id: user_id[0], group_id: group_id[0]}].concat(friends) //return your info plus new members of friends
                  })
                })
              }else{  //if you DON'T have any friends
                return [{user_id: user_id[0], group_id: group_id[0]}] //return your info
              }
              })
            })
          })
        } else {  //if user is already in the database
          var yourFriends = profile._json.friends.data //grab friends
          var your_id = value[0].id; //grab your user id
          if(yourFriends.length === 0){ //if no friends in the facebook given list
            return value;
          }
          return User.getFriendsListId(your_id).then(function(friendsListId) { //grab friends list ID from database
            return User.getMemberList(friendsListId[0].id).then(function(members) { //grab your friends list from database using the ID
                var newFriends = yourFriends.filter(function(friend) { //filter out all friends in your facebook friends list that are already in database
                  var friendNotInDatabase = true;
                  for (var i = 0; i < members.length; i++) {
                    if (members[i].facebook_id === friend.id) {
                      friendNotInDatabase = false;
                    }
                  }
                  return friendNotInDatabase
                })
                if(newFriends.length > 0){  //if you have any new friends
                return Promise.all(newFriends.map(function(friend) { //Take all the new friends and grab their user_id by using their facebook id
                  return User.getUserByFacebookId(friend.id)
                })).then(function(friendArrayArray) { //Take all the new friends and format them for database entry
                  var friendsValues = friendArrayArray.map(function(eachFriend) {
                    return {
                      user1_id: eachFriend[0].id,
                      group_id: friendsListId[0].id,
                      rank: 'member'
                    }
                  })
                  return User.addMemberships(friendsValues).then(function(memberships) { //Add them to the database
                    return value.concat(memberships)    //new friends added
                  })
                })
              } else {
                return value    //No new friends added
              }
            })
          })
        }
      }) 
}