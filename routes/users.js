var express = require('express')
var router = express.Router()
var User = require('../models/user')

//handles a POST request to base url ('/') of this router.
//Since this router is used in the path localhost:5000/api/users/,
//localhost:5000/api/user/ <-- is the base URL.
//adds user to database.
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

//handles a GET request to url (.../api/users/:firstName)
//returns a single user whos first name is written in URL.
//e.g.: localhost:5000/api/users/Albert
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