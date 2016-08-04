var express = require('express');
var router = express.Router();

module.exports = router;

router.get('/loggedIn', function(req, res) {
  if(req.isAuthenticated()){
    console.log("req user",req.user)
    const userId = req.user[0].id;
    res.status(200).send({ id: userId });
  }
  else{
    console.log('woah')
    res.send(false);
  }
})

router.post('/logOut', function(req, res) {
  req.logout();     
  req.session.destroy();    
  res.send(false); 
})
