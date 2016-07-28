var express = require('express');
var router = express.Router();

// *** define routes for each model here in index *** //
router.use('/events', require('./events'));

module.exports = router;
