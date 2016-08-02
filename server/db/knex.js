var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];

var knex = require('knex')(config);

if (environment !== 'test') {
    knex.migrate.latest([config]).then(function(value){
      knex.seed.run([config])
    })
    
}

module.exports = knex;

