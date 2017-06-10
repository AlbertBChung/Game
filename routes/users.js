var express = require('express')
var router = express.Router()
var User = require('../models/user')



router.post('/', function(req, res) {

  var user = new User();

	user.firstName = req.body.firstName
	user.lastName = req.body.lastName
	user.email = req.body.email

  user.save(function(err) {
    if (err)
      res.send(err);
    else {
	    res.json({ message: 'User added!', data: user });
    }
  });

});

router.get('/:firstName', function(req, res){
	User.findOne( {'firstName': req.params.firstName},function(err, user){
	  if (err) {
	    res.send(err);
	  }
	  else {
	    res.json(user);
	  }
	})
})

module.exports = router