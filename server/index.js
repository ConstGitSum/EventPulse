const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');


var app = express();

var assetFolder = path.join(__dirname, '..', 'client','public');

app.use(express.static(assetFolder));
app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.json());

// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile( assetFolder + '/index.html' );
})

app.listen(3000);
