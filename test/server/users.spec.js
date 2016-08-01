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

  xdescribe('GET /api/users/:id', function() {
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

  xdescribe('POST /api/users', function() {
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

  xdescribe('GET /api/users/getMemberships/:id', function(){
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

  xdescribe('GET /api/users/getMemberList/:group_id', function(){
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
        done();
      })
    })
  })

  xdescribe('GET /api/users/getFriendsListId', function(){
    it('should get the ID of the friends list for a user', function(done){
      chai.request(server)
      .get('/api/users/getFriendsListId/1')
      .end(function(err,res){
        res.should.have.status(200);
        res.should.be.json; 
        res.body.should.be.a('array');
        res.body.length.should.equal(1);
        res.body[0].should.have.property('id');
        res.body[0].id.should.equal(2)
         done();
      })
     
     
    })
  })

  xdescribe('POST /api/users/addGroup', function(){
    it('should add a group to the database', function(done){
      chai.request(server)
        .post('/api/users/addGroup')
        .send({
          groupName: 'Super Best Friends',
        })
        .end(function(err, res) {
          res.should.have.status(201);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body[0].should.equal(4)
          done();
      })
    })
    it('should not need a group name', function(done){
      chai.request(server)
        .post('/api/users/addGroup')
        .send({})
        .end(function(err, res) {
          res.should.have.status(201);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body[0].should.equal(4)
          done();
      })
    })
  })
                                                                   
  xdescribe('POST /api/users/addMemberships', function(){
    it('should add a member to a group', function(done){
      chai.request(server)
        .post('/api/users/addMemberships')
        .send({
          user1_id: 2,
          group_id: 2,
          rank: 'member'
        })
        .end(function(err, res) {
          res.should.have.status(201);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(4);
          res.body[0].should.have.property('user1_id');
          res.body[0].user1_id.should.equal(2);
          res.body[0].should.have.property('group_id');
          res.body[0].group_id.should.equal(2);
          res.body[0].should.have.property('rank');
          res.body[0].rank.should.equal('member');
          done();
      })   
    })
    it('should add multiple members to a group', function(done){
      chai.request(server)
        .post('/api/users/addMemberships')
        .send([{
          user1_id: 1,
          group_id: 3,
          rank: 'member'
        },{
          user1_id: 2,
          group_id: 3,
          rank: 'member'}])
        .end(function(err,res){
          res.should.have.status(201);
          res.should.be.json; // jshint ignore:line
          res.body.should.be.a('array');
          res.body[0].should.have.property('id');
          res.body[0].id.should.equal(4);
          res.body[0].should.have.property('user1_id');
          res.body[0].user1_id.should.equal(1);
          res.body[0].should.have.property('group_id');
          res.body[0].group_id.should.equal(3);
          res.body[0].should.have.property('rank');
          res.body[0].rank.should.equal('member');
          res.body[1].should.have.property('id');
          res.body[1].id.should.equal(5);
          res.body[1].should.have.property('user1_id');
          res.body[1].user1_id.should.equal(2);
          res.body[1].should.have.property('group_id');
          res.body[1].group_id.should.equal(3);
          res.body[1].should.have.property('rank');
          res.body[1].rank.should.equal('member');
          done();
        })
    })
  })
 describe('Passport helper function works', function(){
  var profile = {
    name: {
      givenName: 'Jad',
      familyName: 'Carson'
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '1234',
    _json:{
      friends:{
        data: []
      }
    }
  }
  var profile2 = {
    name: {
      givenName: 'bat',
      familyName: 'man'
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '1234',
    _json:{
      friends:{
        data: [{name:'Alice',id:'12104755554605551'}]
      }
    }
  }
  var profile3 = {
    name: {
      givenName: 'cat',
      familyName: 'man'
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '1234',
    _json:{
      friends:{
        data: [{name:'Alice',id:'12104755554605551'},{name:'Bob', id:'12104755554605552'}]
      }
    }
  }
  var profile4 = {
    name: {
      givenName: 'Alice',
      familyName: ''
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '12104755554605551',
    _json:{
      friends:{
        data: [{name:'Carl', id:'12104755554605553'}]
      }
    }
  }
  var profile5 = {
    name: {
      givenName: 'Alice',
      familyName: ''
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '12104755554605551',
    _json:{
      friends:{
        data: [{name:'Bob', id:'12104755554605552'}]
      }
    }
  }
  var profile6 = {
    name: {
      givenName: 'Alice',
      familyName: ''
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '12104755554605551',
    _json:{
      friends:{
        data: [{name:'Bob', id:'12104755554605552'},{name: 'Jimbo', id: '12104755554605554'}]
      }
    }
  }

  var profile7 = {
    name: {
      givenName: 'Bob',
      familyName: ''
    },
    emails: [{value: 'jad@jad.com'}],
    photos: [{value: 'www.superCoolImage.com'}],
    id: '12104755554605552',
    _json:{
      friends:{
        data: []
      }
    }
  }
    xit('should add a new facebook user with no friends :-(', function(done){
      chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token: 2,
        profile: profile
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('user_id');
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(4);
        done();
      })
     
     
    })
    xit('should add a new facebook user with a friend', function(done){
      chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token:2,
        profile: profile2
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('user_id')
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(4);
        res.body[1].should.have.property('id')
        res.body[1].id.should.equal(6);
        res.body[1].should.have.property('user1_id');
        res.body[1].user1_id.should.equal(1);
        res.body[1].should.have.property('group_id')
        res.body[1].group_id.should.equal(4);
        res.body[1].should.have.property('rank');
        res.body[1].rank.should.equal('member');
        done();
      })
    })
     
      it('should add a new facebook user with multiple friends', function(done){
      chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token:2,
        profile: profile3
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('user_id')
        res.body[0].user_id.should.equal(5);
        res.body[0].should.have.property('group_id');
        res.body[0].group_id.should.equal(4);
        res.body[1].should.have.property('id')
        res.body[1].id.should.equal(6);
        res.body[1].should.have.property('user1_id');
        res.body[1].user1_id.should.equal(1);
        res.body[1].should.have.property('group_id')
        res.body[1].group_id.should.equal(4);
        res.body[1].should.have.property('rank');
        res.body[1].rank.should.equal('member');
        res.body[2].id.should.equal(7);
        res.body[2].should.have.property('user1_id');
        res.body[2].user1_id.should.equal(2);
        res.body[2].should.have.property('group_id')
        res.body[2].group_id.should.equal(4);
        res.body[2].should.have.property('rank');
        res.body[2].rank.should.equal('member');
        done();
      })
    })
      it('should log in a previous user who hasn\'t added any friends since last time', function(done){
        chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token:2,
        profile: profile4
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id')
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('name')
        res.body[0].name.should.equal('Alice')
        res.body[0].should.have.property('facebook_id');
        res.body[0].facebook_id.should.equal('12104755554605551');
        done();
      })
      })
      it('should log in a previous user who has added a friend since last time', function(done){
        chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token:2,
        profile: profile5
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id')
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('name')
        res.body[0].name.should.equal('Alice')
        res.body[0].should.have.property('facebook_id');
        res.body[0].facebook_id.should.equal('12104755554605551');
        res.body[1].should.have.property('id')
        res.body[1].id.should.equal(5);
        res.body[1].should.have.property('user1_id')
        res.body[1].user1_id.should.equal(2)
        res.body[1].should.have.property('group_id');
        res.body[1].group_id.should.equal(2);
        res.body[1].should.have.property('rank');
        res.body[1].rank.should.equal('member')
        done();
      })
      })

      it('should log in a previous user who has added multiple friends since last time', function(done){
        chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token:2,
        profile: profile6
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id')
        res.body[0].id.should.equal(1);
        res.body[0].should.have.property('name')
        res.body[0].name.should.equal('Alice')
        res.body[0].should.have.property('facebook_id');
        res.body[0].facebook_id.should.equal('12104755554605551');
        res.body[1].should.have.property('id')
        res.body[1].id.should.equal(5);
        res.body[1].should.have.property('user1_id')
        res.body[1].user1_id.should.equal(2)
        res.body[1].should.have.property('group_id');
        res.body[1].group_id.should.equal(2);
        res.body[1].should.have.property('rank');
        res.body[1].rank.should.equal('member')
        res.body[2].should.have.property('id')
        res.body[2].id.should.equal(6);
        res.body[2].should.have.property('user1_id')
        res.body[2].user1_id.should.equal(4)
        res.body[2].should.have.property('group_id');
        res.body[2].group_id.should.equal(2);
        res.body[2].should.have.property('rank');
        res.body[2].rank.should.equal('member')
        done();
      })
      })

      it('should log in a previous user who has no friends', function(done){
        chai.request(server)
      .post('/api/passportFacebook/testPassport')
      .send({
        token:2,
        profile: profile7
      })
      .end(function(err,res){
        res.should.have.status(201);
        res.body.should.be.a('array');
        res.body[0].should.have.property('id')
        res.body[0].id.should.equal(2);
        res.body[0].should.have.property('name')
        res.body[0].name.should.equal('Bob')
        res.body[0].should.have.property('facebook_id');
        res.body[0].facebook_id.should.equal('12104755554605552');
        done();
      })
      })
  })
});
