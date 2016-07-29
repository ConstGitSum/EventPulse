var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];

var knex = require('knex')(config);

knex.migrate.latest([config]);
knex.seed.run([config]);

module.exports = knex;

