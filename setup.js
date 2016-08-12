'use strict';
if (process.env.NODE_ENV !== 'production') {
	var fs = require('fs');
	fs.createReadStream('.sample-env')
	  .pipe(fs.createWriteStream('.env'));