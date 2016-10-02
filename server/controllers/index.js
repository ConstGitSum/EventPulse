const express = require('express');
const router = express.Router();

// *** decorate the express app with each route *** //
router.use('/events', require('./events'));
router.use('/users', require('./users'));
router.use('/passportFacebook', require('./passport_facebook'));
router.use('/auth', require('./authentication'));

module.exports = router;
