var knex = require('../db/knex');
var Guest = require('./guest')

module.exports = {
  getAll,
  getEventById,
  create,
  update,
  deleteEvent,
  addChatMessage,
  getChatMessages
};

function getAll() {
  return knex('events').select();
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

function addChatMessage(id,event_id,message) {
  return knex('messages')
    .insert({user_id: id, event_id: event_id, text: message})
    .return();
}

function getChatMessages(event_id) {
  return knex('messages')
    .join('users','messages.user_id','users.id')
    .where('messages.event_id', event_id)
    .select()
    .returning(['users.name','messages.text', 'users.image']);
}