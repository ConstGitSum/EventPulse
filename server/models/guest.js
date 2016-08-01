var knex = require('../db/knex');

module.exports = {
  getGuests: getGuests,
  create: create,
  deleteGuest: deleteGuest
};

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

function create(body) {
  return knex('guests').insert(body).returning('user_id');
}

function deleteGuest(eventId, userId) {
  return knex('guests').where({ event_id: eventId, user_id: userId }).del();
}
