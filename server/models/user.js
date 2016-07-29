var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getUserById: getUserById,
  create: create,
  getGuests: getGuests
};

function getUserById(id) {
  return knex('users').where('id', id);
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

