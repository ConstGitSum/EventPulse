var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getUserById: getUserById,
  getUserByFacebookId,
  create: create,
  getGuests: getGuests,
  addGroup: addGroup,
  addMemberships: addMemberships,
  getMemberList: getMemberList,
  getMemberships: getMemberships,
  getFriendsListId: getFriendsListId
};

function getUserById(id) {
  return knex('users').where('id', id);
}

function getUserByFacebookId(fId) {
  return knex('users').where('facebook_id',fId);
}

function create(user) {
  return knex('users').insert(user).returning('id');
}

function getGuests(id) {
  return knex('users')
    .join('guests', 'users.id', 'guests.user_id')
    .where('guests.event_id', id)
    .select(
      'users.id', 
      'users.name', 
      'users.email', 
      'users.image', 
      'users.facebook_id'
    );
}

function addGroup(groupName='friends'){
  return knex('groups').insert({name: groupName}).returning('id');
}

function getMemberList(group_id){
  return knex('memberships').join('users','users.id','memberships.user1_id')
  .where('group_id',group_id)
}

function addMemberships(user){
  return knex('memberships').insert(user).returning(['id','user1_id','group_id','rank'])
}

function getMemberships(user_id){
  return knex('memberships')
  .join('groups','groups.id','memberships.group_id')
  .where('user1_id', user_id)  //maybe grab everything but friends
}

function getFriendsListId(user_id){
return knex('memberships')
.join('groups','groups.id','memberships.group_id')
.where('groups.name','friends')
.andWhere('memberships.user1_id',user_id)
.andWhere('memberships.rank','owner')
.select('groups.id')
}

