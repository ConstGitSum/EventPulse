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

  describe('POST /api/users', function() {
    it('should add an user', function(done) {
      chai.request(server)
        .post('/api/users')
        .send({
          name: 'Carol',
          email: 'carol@gmail.com',
          image: 'https://imageurl',
          facebook_id: '1239015739016431'
        })
        .end(function(err, res) {
          res.should.have.status(201);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.name.should.equal('Carol');
          res.body.should.have.property('email');
          res.body.email.should.equal('carol@gmail.com');
          res.body.should.have.property('image');
          res.body.image.should.equal('https://imageurl');
          res.body.should.have.property('facebook_id');
          res.body.facebook_id.should.equal('1239015739016431');
          done();
        });
    });
  });

  describe('GET /api/users/getMemberships/:id', function(){
    it('should get all memberships for a user', function(done) {
      chai.request(server)
      .get('/api/users/getMemberships/2')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; 
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('user1_id');
        res.body[0].user1_id.should.equal(2);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(1);
        res.body[0].should.have.property('rank');
        res.body[0].rank.should.equal('member');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('ConstGitSum')
        done()
      })
    })
  })

  describe('GET /api/users/getMemberList/:group_id', function(){
    it('should get all members in a group', function(done) {
      chai.request(server)
      .get('/api/users/getMemberList/1')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; 
        res.body.should.be.a('array');
        res.body.length.should.equal(2);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('user1_id');
        res.body[0].user1_id.should.equal(1);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(1);
        res.body[0].should.have.property('rank');
        res.body[0].rank.should.equal('admin');
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Alice')
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('alice@gmail.com');
        res.body[0].should.have.property('image');
        res.body[0].image.should.equal('https://imageurl');
        res.body[0].should.have.property('facebook_id');
        res.body[0].facebook_id.should.equal('12104755554605551');
        res.body[1].should.have.property('id');
        res.body[1].id.should.equal(2);
        res.body[1].should.have.property('user1_id');
        res.body[1].user1_id.should.equal(2);
        res.body[1].should.have.property('group_id');
        res.body[1].group_id.should.equal(1);
        res.body[1].should.have.property('rank');
        res.body[1].rank.should.equal('member');
        res.body[1].should.have.property('name');
        res.body[1].name.should.equal('Bob')
        res.body[1].should.have.property('email');
        res.body[1].email.should.equal('bob@gmail.com');
        res.body[1].should.have.property('image');
        res.body[1].image.should.equal('https://imageurl');
        res.body[1].should.have.property('facebook_id');
        res.body[1].facebook_id.should.equal('12104755554605552');
        done()
      })
    })
  })

});
