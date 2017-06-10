require('dotenv').config()
var express = require('express')
var jquery = require('jquery')
var mongoose = require('mongoose')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', "*"); 
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});

// Connect to the MongoDB
mongoose.connect(process.env.MONGODB_URI);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


var router = express.Router()
router.use('/users', require('./routes/users.js'))
router.get('/', function (req, res) {
  res.json({ message: 'API' })
})
app.use('/api', router)


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});




