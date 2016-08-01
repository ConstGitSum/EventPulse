var knex = require('../db/knex');

module.exports = {
  create: create,
};

function create(body) {
  return knex('guests').insert(body).returning('user_id');
}
