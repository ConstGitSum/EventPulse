var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getAll: getAll,
  getEventById: getEventById,
  create: create
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
