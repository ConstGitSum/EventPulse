var knex = require('../db/knex');

module.exports = {
  getAll: getAll,
  getUnhidden: getUnhidden,
  getHidden: getHidden,
  getEventById: getEventById,
  create: create,
  update: update,
  deleteEvent: deleteEvent
};

function getAll() {
  return knex('events').select();
}

function getUnhidden(userId) {
  return knex.raw(
    `SELECT events.id, events.* FROM events 
    LEFT JOIN (
      SELECT * FROM hidden_events
      WHERE user_id = ${userId}
    ) AS hidden
    ON events.id = hidden.event_id
    WHERE hidden.event_id IS NULL`)
    .then(res => res.rows);
}

function getHidden(userId) {
  return knex.raw(
    `SELECT events.id, events.* FROM events 
    LEFT JOIN (
      SELECT * FROM hidden_events
      WHERE user_id = ${userId}
    ) AS hidden
    ON events.id = hidden.event_id
    WHERE hidden.event_id IS NOT NULL`)
}

function getEventById(id) {
  return knex('events').where('id', id);
}

function create(event) {
  return knex('events').insert(event).returning('id');
}

function update(id, event) {
  return knex('events').where('id', id).update(event).returning('id');
}

function deleteEvent(id) {
  // delete event guests and messages first, then the event
  return Promise.all([
    knex('guests').where('event_id', id).del(),
    knex('messages').where('event_id', id).del(),
    knex('events').where({'id': id}).del()
  ]);
}
