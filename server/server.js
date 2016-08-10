var path = require('path');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('../webpack.config.js');
var passport = require('passport');
var session = require('express-session');
var app = express();

var routes = require('./controllers/index');
var assetFolder = path.join(__dirname, '..', 'client','public');

var sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
})

var socketIo = require('socket.io')   //This is the stuff I added up here for socket IO
var server = http.createServer(app)
var io = socketIo(server).use(function(socket, next){
  sessionMiddleware(socket.request, {}, next)
})

require('dotenv').load();

var Event = require('./models/event');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig), { noInfo: true }));
app.use(bodyParser.json());

require('./passport')(passport);

app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes)

// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})

io.on('connection', socket => {
  //if(socket.request.session.passport)  //I'm working on attaching session info to socket.
  {
  socket.on('room', (theRoom) => {    //if server gets a room, add the person to room
    socket.join(theRoom)
  })

  socket.on('user', user => {     //if the server gets a user, add the person to a room with name of user
    socket.join(user)
    Event.getInvites(user).then((values) => {   //Grab all invites for the user
      var event_ids = values.map(value => {
        return value.event_id                   //Grab the event ids from the invites
      })
      io.to(user).emit('allInvites', event_ids)   //give client all the invites the user has.
    })
  })

  socket.on('invite', invites => {              //If server gets invite
    invites.slice(2).forEach(invite => io.to(invite).emit('invite', invites[0]))  //the request comes like [event_id, invitor_id, [invitees]].  Tell every invitee that they're invited
    Promise.all(invites.slice(2).map((invitee) => {
      return Event.checkInvite(invitee,invites[0]).then(value => {        //For each invitess, check to see if they are already invited to event
        if(value.length === 0){
          return {user_id: invites[1], invitee_id: invitee, event_id: invites[0]}   //If they are not invited, get them ready to insert into database
        }
      })
      
    }))
    .then((values) => Event.addInvite(values))      //For each person not in database, add them to database
    .then()
  })

  socket.on('removeInvite', invite => {           //Server told to remove an invite
    Event.removeInvite({id: invite[0], event_id: invite[1]}).then()

  })

  socket.on('message', (body)=> {             //server given a message
    io.to('event' + body.event).emit('message',{    //server tells everyone in the correct room the message
      text: body.text,
      name: body.name,
      image: body.image
    })

    Event.addChatMessage(body.user_id, body.event, body.text);
  })
}
})

server.listen(3000);

module.exports = app;
