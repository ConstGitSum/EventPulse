var express = require('express');
var router = express.Router();


// *** GET all events *** //
router.get('/events', function(req, res, next) {
  res.send('send events back');
});


module.exports = router;
