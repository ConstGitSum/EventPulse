var knex = require('../db/knex');

// *** queries *** //

function getAll() {
  return knex('events').select();
}

module.exports = {
  getAll: getAll
};
