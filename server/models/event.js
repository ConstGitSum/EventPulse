var knex = require('../db/knex');
var Guest = require('./guest')
module.exports = {
  getAll,
  getUnhidden,
  getHidden,
  getCreated,
  getJoined,
  getPending,
  getEventById,
  create,
  update,
  deleteEvent
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
    .then(res => res.rows);
}

function getCreated(userId) {
  return knex('events').where('created_by', userId);
}

function getJoined(userId) {
  return knex.raw(
    `SELECT events.id, events.* FROM events 
    LEFT JOIN (
      SELECT * FROM guests
      WHERE user_id = ${userId}
    ) AS guests
    ON events.id = guests.event_id
    WHERE (guests.status = 'accepted' AND events.created_by != ${userId})`)
    .then(res => res.rows);
}

function getPending(userId) {
  return knex.raw(
    `SELECT events.id, events.* FROM events 
    LEFT JOIN (
      SELECT * FROM guests
      WHERE user_id = ${userId}
    ) AS guests
    ON events.id = guests.event_id
    WHERE guests.status = 'pending'`)
    .then(res => res.rows);
}

function getEventById(id) {
  return knex('events').where('id', id);
}

function create(event) {
  return knex('events').insert(event).returning(['id','created_by']).then((newEvent) =>{
    return Guest.create({user_id: newEvent[0].created_by, event_id: newEvent[0].id, status: 'accepted'}).then(function(value){
      return newEvent
    })
  })
  //return knex('events').insert(event).returning('id');
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
