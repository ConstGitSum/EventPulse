var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/loggedIn', function(req, res) {
  if(req.isAuthenticated()){
    const userId = req.user[0].id;
    const userName = req.user[0].name
    const image = req.user[0].image
    res.status(200).send({ id: userId, name: userName, image: image });
  }
  else{
    res.send(false);
  }
})

router.post('/logOut', function(req, res) {
  req.logout();     
  req.session.destroy();    
  res.send(false); 
})
