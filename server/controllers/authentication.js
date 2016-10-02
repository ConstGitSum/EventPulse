const express = require('express');

const router = express.Router();

module.exports = router;

router.get('/loggedIn', function (req, res) {
  if (req.isAuthenticated()) {
    const userId = req.user[0].id;
    const userName = req.user[0].name;
    const image = req.user[0].image;
    // CHANGE THIS TO SLICE(2) TO NOT SHOW YOURSELF IN FRIEND'S LIST  CURRENTLY AT 1 FOR TESTING
    const friendsList = req.user.slice(1);

    res.status(200).send({ id: userId, name: userName, image, friendsList });
  } else {
    res.send(false);
  }
});

router.post('/logOut', function (req, res) {
  req.logout();
  req.session.destroy();
  res.send(false);
});
