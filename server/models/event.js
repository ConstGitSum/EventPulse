var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getAll: getAll,
  getEventById: getEventById
};

function getAll() {
  return knex('events').select();
}

function getEventById(id) {
  return knex('events').where('id', id);
}

