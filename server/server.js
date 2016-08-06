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
// io.on('connection', socket => {
//   console.log('hello')
//   socket.join('room1')
//   socket.to('room1').emit('message','hey!')
// })
// var room = 'room1'
// io.in(room).emit('message', 'what is happening people?')
// io.in('foobar').emit('message','boo!')
io.on('connection', socket => {
  //socket.join('room1')
  var room = "";
  socket.on('room', (theRoom) => {
    socket.join(theRoom)
    console.log("ROOOM3", io.sockets.adapter.rooms)
    room = theRoom 
  })
  console.log("socket",socket.rooms)
  //socket.to('room1').emit('message',{text: 'hello', name: 'ted', image: 'www.asdasd.com'})
  socket.on('message', (body)=> {
    console.log('body',body)
    io.to('event'+body.event).emit('message',{
      text: body.text,
      name: body.name,
      image: body.image
    })

    Event.addChatMessage(body.user_id, body.event, body.text);
  })
})

server.listen(3000);

module.exports = app;
