var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: Date, required: true },
})

module.exports = connection.model('User', UserSchema)
