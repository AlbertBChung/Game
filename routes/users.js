var express = require('express')
var router = express.Router()
var User = require('../models/user')
var authController = require('../auth/auth');

//handles a POST request to base url ('/') of this router.
//Since this router is used in the path localhost:5000/api/users/,
//localhost:5000/api/user/ <-- is the base URL.
//adds user to database.
router.post('/', function(req, res) {

  var user = new User();

	user.username = req.body.username
	user.password = req.body.password
	user.email = req.body.email

  user.save(function(err) {
    if (err)
      res.send(err);
    else {
	    res.json({ message: 'User added!', data: user });
    }
  });

});

router.post('/a', authController.isAuthenticated, function(req, res) {

	   res.json({ message: 'auth' });


});


module.exports = router