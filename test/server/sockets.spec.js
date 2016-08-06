process.env.NODE_ENV = 'test';

var chai = require('chai'),
    mocha = require('mocha'),
    should = chai.should();
 
 var chaiHttp = require('chai-http');

var server = require('../../server/server');
var io = require('socket.io-client');
 
xdescribe("echo", function () {
 
    
    var options ={
            transports: ['websocket'],
            'force new connection': true
        };
 
    beforeEach(function (done) {
        // start the server
        //var server = require('../../server/server');
        //server = require('../../server/server').server;
 
        done();
    });
    it("echos message", function (done) {
        //var client = io('/')
        var client = io.connect("http://localhost:3000", options);
 
        client.once("connect", function () {
            console.log("herer")
            client.once("message", function (message) {
                message.should.equal("Hello World");
 
                client.disconnect();
                done();
            }); 
        });
    });
})