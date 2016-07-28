var express = require('express');
var router = express.Router();

// *** define routes for each model here in index *** //
router.use('/events', require('./events'));
router.use('/passportFacebook',require('./passport_facebook'))
router.use('/auth',require('./authentication'))

module.exports = router;
