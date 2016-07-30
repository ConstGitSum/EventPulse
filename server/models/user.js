var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getUserById: getUserById,
  getUserByFacebookId,
  create: create,
  getGuests: getGuests,
  addGroup: addGroup,
  addMemberships: addMemberships
};

function getUserById(id) {
  return knex('users').where('id', id);
}

function getUserByFacebookId(fId) {
  console.log("facebook ID",fId)
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

function addMemberships(user){
  console.log("user value",user)
  return knex('memberships').insert(user)
}
