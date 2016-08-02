var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];

var knex = require('knex')(config);

if (environment !== 'test') {
  Promise.resolve(knex.migrate.rollback([config]))
    .then(() => {
      return knex.migrate.latest([config]);
    })
    .then(() => {
      return knex.seed.run([config]);
    })
}

module.exports = knex;

