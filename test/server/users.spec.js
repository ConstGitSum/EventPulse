process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../server/server');
var knex = require('../../server/db/knex');

chai.use(chaiHttp);


describe('API User Routes', () => {

  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('GET /api/users/:id', function() {
    it('should return a single user', function(done) {
      chai.request(server)
        .get('/api/users/2')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('name');
          res.body[0].name.should.equal('Bob');
          res.body[0].should.have.property('email');
          res.body[0].email.should.equal('bob@gmail.com');
          res.body[0].should.have.property('image');
          res.body[0].image.should.equal('https://imageurl');
          res.body[0].should.have.property('facebook_id');
          res.body[0].facebook_id.should.equal('12104755554605552');
          done();
        });
    });
  });


});
