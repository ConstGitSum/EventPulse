var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];

var knex = require('knex')(config);

if (environment == 'development') {
  knex.migrate.rollback([config]).then((value) => {
    knex.migrate.latest([config]).then((value) => {
      knex.seed.run([config]);
    })
  })

}
if(environment == 'production') {
  knex.migrate.latest([config]);
}
module.exports = knex;

