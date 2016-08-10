var User = require('./models/user');

module.exports = {
  passport_helper: passport_helper
}

function passport_helper(token, profile) {
  return User.getUserByFacebookId(profile.id)
    .then(user => 
      user.length === 0
      ? newUser(user, profile)
      : existingUser(user, profile)
    ); 
}

function newUser(user, profile) {
  let userId, groupId, userName, image;
  // create the user in the database
  return User.create(buildNewUser(profile))
    // add a new friends group
    .then((user_id) => {
      userId = user_id[0].id;
      userName = user_id[0].name;
      image = user_id[0].image
      return User.addGroup();
    }) 
    // add the user to the new friends group as the owner
    .then((group_id) => {
      //console.log("FRIENDS",profile._json.friends.data)
      groupId = group_id[0];
      return User.addMemberships(buildNewMembership(userId, groupId, 'owner')); 
    })
    .then(() => 
      profile._json.friends.data.length === 0
      // return user info if no friends
      ? [{ id: userId, group_id: groupId, name: userName, image: image }]
      // else grab the friends from database
      : Promise.all(profile._json.friends.data
          .map(friend => User.getUserByFacebookId(friend.id))
        )
        .then(friendArray =>  {
        // take all friends and format them for database entry
        if(friendArray[0][0]) {  //Just in case a user has our app but isn't in our database
          return User.addMemberships(buildMembershipList(friendArray, groupId, 'member'))
         }
        }
        )
        // return your info plus new members of friends
        .then(memberships => User.getMemberList(groupId))
        .then(friends => [{ id: userId, group_id: groupId, name: userName, image: image}].concat(friends)) 
    );
}

function existingUser(user, profile) {
  var friends = profile._json.friends.data // grab friends
  var userId = user[0].id;
  let friendsListId;

  // if no friends in the facebook given list
  if (friends.length === 0) { 
    return user;
  }

  // grab friends list ID from database
  // then grab friends list from database using the ID
  // then filter out facebook friends that are already in database
  return User.getFriendsListId(userId)
    .then((friendsList) => {
      console.log(friendsList)
      friendsListId = friendsList[0].id;
      return User.getMemberList(friendsListId);
    }) 
    .then((members) => { 
      const newFriends = friends.filter((friend) => 
        !members.some(e => e.facebook_id === friend.id)
      );

      // if you have any new friends
      // take all the new friends and grab their user_id 
      // by using their facebook id
      return newFriends.length === 0
      ? user.concat(members)
      : Promise.all(newFriends.map(friend => User.getUserByFacebookId(friend.id)))
        // Take all the new friends and format them for database entry
        .then(friendArray => {
          if(friendArray[0][0]){ //Just in case a user has our app but isn't in our database
            //console.log('FA2',friendArray)
            return User.addMemberships(buildMembershipList(friendArray, friendsListId, 'member'))
          }
        }
        )
        // new friends added
        .then(memberships => User.getMemberList(friendsListId))
        .then(memberships => user.concat(memberships)); 
  });
}

// build user object using profile
function buildNewUser(profile) {
  return {
    name: profile.name.givenName + ' ' + profile.name.familyName,
    email: profile.emails[0].value,
    image: profile.photos[0].value,
    facebook_id: profile.id
  };
}

// build membership object
function buildNewMembership(userId,groupId, rank) {
  return {
    user_id: userId, 
    group_id: groupId, 
    rank: rank
  };
}

// build array of membership objects to be inserted
function buildMembershipList(friendArray, groupId) {
  return friendArray.map(friend => buildNewMembership(friend[0].id, groupId, 'member'));
}
