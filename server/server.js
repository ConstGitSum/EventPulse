const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');
const routes = require('./routes/index');

var app = express();

var assetFolder = path.join(__dirname, '..', 'client','public');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());


var passport = require('passport');
var session = require('express-session');

require('./passport')(passport);


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());







app.use('/api', routes)

app.get('/loggedIn',function(req,res){
	if(req.isAuthenticated()){
    res.send(true);
  }
  else{
   res.send(false);
  }
})
app.post('/logOut',function(req,res){
  req.logout();     
  req.session.destroy();    
  res.send("false"); 
})


// Wild card route for client side routing.
app.get('/*', (req, res) => {
  res.sendFile( assetFolder + '/index.html' );
})

app.listen(3000);

module.exports = app;
