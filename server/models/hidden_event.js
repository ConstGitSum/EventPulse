var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  hide: hide,
  unhide: unhide
};

function hide(eventId, userId) {
  return knex('hidden_events')
    .insert({ user_id: userId, event_id: eventId })
    .returning(['user_id', 'event_id']);
}

function unhide(eventId, userId) {
  return knex('hidden_events')
    .where({ user_id: userId, event_id: eventId })
    .del();
}
