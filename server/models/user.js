var knex = require('../db/knex');

// *** queries *** //

module.exports = {
  getUserById: getUserById,
  create: create
};

function getUserById(id) {
  return knex('users').where('id', id);
}

function create(user) {
  return knex('users').insert(user).returning('id');
}
