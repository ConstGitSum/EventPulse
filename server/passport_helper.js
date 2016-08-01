var User = require('./models/user');
module.exports = {
passport_helper: passport_helper
}
function passport_helper(token,profile) {
  console.log("PROFILE",profile)
return User.getUserByFacebookId(profile.id).then(function(value) {
        if (value.length === 0) {
          let user = {
              name: (profile.name.givenName + ' ' + profile.name.familyName),
              email: profile.emails[0].value,
              image: profile.photos[0].value,
              facebook_id: profile.id
            } //name, email,image, facebook_id
          return User.create(user).then(function(user_id) {
            return User.addGroup().then(function(group_id) {
              return User.addMemberships({
                user1_id: user_id[0],
                group_id: group_id[0],
                rank: 'owner'
              }).then(function() {
                if(profile._json.friends.data.length > 0){
                return Promise.all(profile._json.friends.data.map(function(friend) {
                  return User.getUserByFacebookId(friend.id)
                })).then(function(friendArrayArray) { //This returns an double array [[{}],[{}]]
                  var friendsValues = friendArrayArray.map(function(eachFriend) {
                    return {
                      user1_id: eachFriend[0].id,
                      group_id: group_id[0],
                      rank: 'member'
                    }
                  })
                  console.log("friendsValues",friendsValues)
                  return User.addMemberships(friendsValues).then(function(friends) {
                    return [{user_id: user_id[0],group_id: group_id[0]}].concat(friends) //yes friends
                  })
                })
              }else{
                console.log('user_id',user_id, group_id)
                return [{user_id: user_id[0], group_id: group_id[0]}] //no friends
              }
              })
            })
          })
        } else {
          var yourFriends = profile._json.friends.data //grab friends
          var your_id = value[0].id; //grab your user id
          console.log("here I am",value)
          if(yourFriends.length === 0){ //if no friends in the facebook given list
            return value;
          }
          return User.getFriendsListId(your_id).then(function(friendsListId) { //grab friends list ID from database
            return User.getMemberList(friendsListId[0].id).then(function(members) { //grab your friends list from database using the ID
                var newFriends = yourFriends.filter(function(friend) { //filter out all friends in your facebook friends list that are already in database
                  var friendNotInDatabase = true;
                  console.log("now I'm here",friend)
                  for (var i = 0; i < members.length; i++) {
                    if (members[i].facebook_id === friend.id) {
                      friendNotInDatabase = false;
                    }
                  }
                  return friendNotInDatabase
                })
                if(newFriends.length>0){  //if you have any new friends
                return Promise.all(newFriends.map(function(friend) { //Take all the new friends and grab their user_id by using their facebook id
                  console.log("friend here",friend)
                  return User.getUserByFacebookId(friend.id)
                })).then(function(friendArrayArray) { //Take all the new friends and format them for database entry
                  console.log("oh wow",friendArrayArray,"AHHHH",newFriends)
                  var friendsValues = friendArrayArray.map(function(eachFriend) {
                    return {
                      user1_id: eachFriend[0].id,
                      group_id: friendsListId[0].id,
                      rank: 'member'
                    }
                  })
                  return User.addMemberships(friendsValues).then(function(memberships) { //Add them to the database
                    console.log("bam wam!",value.concat(memberships))
                    return value.concat(memberships)    //new friends added
                  })
                })
              } else {
                console.log('value',value)
                return value    //No new friends added
              }
            })
          })
        }
      }) 
}