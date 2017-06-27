// Load required packages
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport'); //module to handle authentication.
var User = require('../models/user');



passport.use(new LocalStrategy(
  function(username, password, callback) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return callback(err); }

      // No user found with that username
      if (!user) { return callback(null, false); }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    });
  }
));



exports.isAuthenticated = passport.authenticate('local', { session : false });