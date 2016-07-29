process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../server/server');
var knex = require('../../server/db/knex');

chai.use(chaiHttp);


describe('API Routes', () => {

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

  describe('GET /api/events', function() {
    it('should return all events', function(done) {
      chai.request(server)
        .get('/api/events')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('title');
          res.body[0].title.should.equal('Pokemongodb party');
          res.body[0].should.have.property('description');
          res.body[0].description.should.equal('Catch pokemon and do some coding');
          res.body[0].should.have.property('created_by');
          res.body[0].created_by.should.equal(1);
          res.body[0].should.have.property('location');
          res.body[0].location.should.equal('701 Brazos Street, Austin, TX');
          res.body[0].should.have.property('time');
          //res.body[0].time.should.equal('2016-08-30T08:00:00.000Z');
          res.body[0].should.have.property('privacy');
          res.body[0].privacy.should.equal(false);
          done();
        });
    });
  });

  describe('GET /api/events/:id', function() {
    it('should return a single event', function(done) {
      chai.request(server)
        .get('/api/events/1')
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('title');
          res.body[0].title.should.equal('Pokemongodb party');
          res.body[0].should.have.property('description');
          res.body[0].description.should.equal('Catch pokemon and do some coding');
          res.body[0].should.have.property('created_by');
          res.body[0].created_by.should.equal(1);
          res.body[0].should.have.property('location');
          res.body[0].location.should.equal('701 Brazos Street, Austin, TX');
          res.body[0].should.have.property('time');
          //res.body[0].time.should.equal('2016-08-30T08:00:00.000Z');
          res.body[0].should.have.property('privacy');
          res.body[0].privacy.should.equal(false);
          done();
        });
    });
  });

});
