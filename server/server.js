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


var socketIo = require('socket.io')   //This is the stuff I added up here for socket IO
var server = http.createServer(app)
var io = socketIo(server)

require('dotenv').load();

var Event = require('./models/event');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig), { noInfo: true }));
app.use(bodyParser.json());

require('./passport')(passport);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes)

// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})
io.on('connection', socket => {
  socket.on('room', (theRoom) => {
    socket.join(theRoom)
  })

  socket.on('user', user => {
    socket.join(user)
    Event.getInvites(user).then((values) => {
      var event_ids = values.map(value => {
        return value.event_id
      })
      io.to(user).emit('allInvites', event_ids)
    })
  })

  socket.on('invite', invites => {
    invites.slice(2).forEach(invite => io.to(invite).emit('invite', invites[0]))
    Promise.all(invites.slice(2).map((invitee) => {
      return Event.checkInvite(invitee,invites[0]).then(value => {  
        if(value.length === 0){
          return {user_id: invites[1], invitee_id: invitee, event_id: invites[0]}
        }
      })
      
    }))
    .then((values) => Event.addInvite(values))
    .then()
  })

  socket.on('removeInvite', invite => {
    Event.removeInvite({id: invite[0], event_id: invite[1]}).then()

  })

  socket.on('leaving', socketId => {
    //io.sockets.connected[socketId].disconnect();
  })

  socket.on('message', (body)=> {
    io.to('event' + body.event).emit('message',{
      text: body.text,
      name: body.name,
      image: body.image
    })

    Event.addChatMessage(body.user_id, body.event, body.text);
  })
})

server.listen(3000);

module.exports = app;
