var express = require('express');
var router = express.Router();



module.exports = router;

router.get('/loggedIn',function(req,res){
	if(req.isAuthenticated()){
    res.send(true);
  }
  else{
   res.send(false);
  }
})
router.post('/logOut',function(req,res){
  req.logout();     
  req.session.destroy();    
  res.send("false"); 
})
