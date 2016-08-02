var User = require('./models/user');

module.exports = {
  passport_helper: passport_helper
}

function passport_helper(token, profile) {
  return User.getUserByFacebookId(profile.id)
    .then((value) => {
      if (value.length === 0) {
        // if the user isn't in the database, create a new user object
        let user = {
          name: profile.name.givenName + ' ' + profile.name.familyName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          facebook_id: profile.id
        };

        let userId, groupId;

        // create the user in the database
        return User.create(user)
          // add a new friends group
          .then((user_id) => {
            userId = user_id[0];
            return User.addGroup();
          }) 
          // add the user to the new friends group as the owner
          .then((group_id) => {
            groupId = group_id[0];

            return User.addMemberships({  
              user_id: userId,
              group_id: groupId,
              rank: 'owner'
            });
          })
          .then(() => {
            // if the user had friends
            if (profile._json.friends.data.length > 0) {  
              return Promise.all(
                // grab the friends from our database
                profile._json.friends.data
                  .map(friend => User.getUserByFacebookId(friend.id))
              )
              // this returns an double array [[{}],[{}]]
              .then((friendArrayArray) => { 
                // map all the friends to get ready to insert them to the friends group
                var friendsValues = friendArrayArray.map((eachFriend) => {  
                  return {
                    user_id: eachFriend[0].id,
                    group_id: groupId,
                    rank: 'member'
                  };
                });
                // add the users to the friends group
                return User.addMemberships(friendsValues)
                  .then((friends) => {  
                  // return your info plus new members of friends
                    return [{ 
                      user_id: userId, 
                      group_id: groupId
                    }].concat(friends) 
                    })
                })
              // if you DON'T have any friends
            } else {  
              // return your info
              return [{ user_id: userId, group_id: groupId }];
            }
          });
      // if user is already in the database
      } else {  
        var yourFriends = profile._json.friends.data // grab friends
        var your_id = value[0].id; // grab your user id

        // if no friends in the facebook given list
        if (yourFriends.length === 0) { 
          return value;
        }

        let friendsListId;

        return User.getFriendsListId(your_id)
          // grab friends list ID from database
          .then((friendsList) => {
            friendsListId = friendsList[0].id;
            return User.getMemberList(friendsListId);
          }) 
          // grab your friends list from database using the ID
          .then((members) => { 
            // filter out all friends in your facebook friends list 
            // that are already in database
            var newFriends = yourFriends.filter((friend) => { 
              var friendNotInDatabase = true;
              for (var i = 0; i < members.length; i++) {
                if (members[i].facebook_id === friend.id) {
                  friendNotInDatabase = false;
                }
              }
              return friendNotInDatabase;
            });

            // if you have any new friends
            if (newFriends.length > 0) {  
              // Take all the new friends and grab their user_id 
              // by using their facebook id
              return Promise.all(
                newFriends.map((friend) => User.getUserByFacebookId(friend.id))
              )
                // Take all the new friends and format them for database entry
                .then((friendArrayArray) => { 
                  var friendsValues = friendArrayArray.map((eachFriend) => {
                    return {
                      user_id: eachFriend[0].id,
                      group_id: friendsListId,
                      rank: 'member'
                    };
                  });

                  return User.addMemberships(friendsValues)
                    .then((memberships) => { // Add them to the database
                      return value.concat(memberships); // new friends added
                    });
                });
            } else {
              return value; // No new friends added
            }
          });
      }
  }); 
}
