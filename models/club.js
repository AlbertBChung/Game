var mongoose = require('mongoose')

var ClubSchema = new mongoose.Schema({
  title:String,
  description:String,
  members:[{ name:String }]
})
