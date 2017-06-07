var express = require('express');
var jquery = require('jquery');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) { 
  res.header('Access-Control-Allow-Origin', "*"); 
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 
  next();
});

var db = MongoClient.connect('mongodb://heroku_3q7stlzb:trivialice752@ds139869.mlab.com:39869/heroku_3q7stlzb', function(err, database) {
  if (err) {
    console.log(err);
  } else {
    db = database;
  } 
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



