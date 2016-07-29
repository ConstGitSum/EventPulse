var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getAll: getAll,
  getEventById: getEventById,
  create: create,
  update: update
};

function getAll() {
  return knex('events').select();
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
