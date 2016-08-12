var knex = require('../db/knex');
var Guest = require('./guest')
var moment = require('moment')

module.exports = {
  getAll,
  getEventById,
  create,
  update,
  deleteEvent,
  addChatMessage,
  getChatMessages,
  addInvite,
  getInvites,
  removeInvite,
  checkInvite
};

function getAll() {
  return knex('events').select();
}

function getEventById(id) {
  return knex('events').where('id', id);
}

function create(event) {
  //console.log("event",moment(event.time))
  //console.log('duration',event.duration)
  var time = event.time;
  event.time = moment(event.time)
   console.log('before',event.time.utc().format())
  event.duration = moment(event.time).add(event.duration,'s').utc().format()
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


function addInvite(users) {
  return knex('invites')
  .insert(users)
  .returning('event_id')
}

function checkInvite(user_id, event_id) {
  return knex('invites')
  .where({invitee_id: user_id, event_id: event_id})
  .select('invitee_id')
}

function getInvites(user_id) {
  return knex('invites')
  .select()
  .where('invitee_id',user_id)
  .returning('event_id')
}

function removeInvite(invite) {
  return knex('invites')
  .where({invitee_id: invite.id, event_id: invite.event_id})
  .del()
}