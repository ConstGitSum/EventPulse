var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/loggedIn', function(req, res) {
  if(req.isAuthenticated()){
    const userId = req.user[0].id;
    const userName = req.user[0].name
    const image = req.user[0].image
    const friendsList = req.user.slice(1)   // CHANGE THIS TO SLICE(2) TO NOT SHOW YOURSELF IN FRIEND'S LIST  CURRENTLY AT 1 FOR TESTING
    
    res.status(200).send({ id: userId, name: userName, image: image, friendsList: friendsList });
  } else {
    res.send(false);
  }
})

router.post('/logOut', function(req, res) {
  req.logout();     
  req.session.destroy();    
  res.send(false); 
})
