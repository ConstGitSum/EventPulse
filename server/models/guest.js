var knex = require('../db/knex');

module.exports = {
  getGuests: getGuests,
  create: create,
  update: update,
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

function update(eventId, userId, status) {
  return knex('guests')
    .where({ event_id: eventId, user_id: userId })
    .update('status', status)
    .returning(['user_id', 'event_id', 'status']);
}

function deleteGuest(eventId, userId) {
  return knex('guests').where({ event_id: eventId, user_id: userId }).del();
}
