require('dotenv').config()
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

console.log(process.env.MONGODB_URI)
var db = MongoClient.connect( process.env.MONGODB_URI, function(err, database) {
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

app.post('/test', function(request, response) {
    var username = request.body.username;
    var time = new Date();
    var toInsert = {
      "username": username,
      "time" : time
    }
    db.collection('users', function(error, coll) {
      coll.insert(toInsert, function(error, saved) {
         if (error) {
            response.send(500);
          }
          else {
              response.send();
          }
      })
    })
});

app.post('/api/user', function(req, res){
  var toInsert = {
    "firstName":  req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email
  }
  db.collection('users', function(err, coll){
    coll.insert(toInsert, function(err, saved){
      if (err) {
        res.send(500);
      }
      else {
        res.send();
      }
    })
  })
});

app.get('/api/user/:firstName', function(req, res){
  db.collection('users', function(err,coll){
    coll.findOne({"firstName": req.params.firstName}, function(err, user){
      if (err) {
        res.send(500);
      }
      else {
        res.send(user);
      }
    })
  })
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



