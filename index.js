require('dotenv').config() //module that allows us to store secret info in .env file. 
                           //These variables are accessed by process.env.VARIABLE_NAME.
var express = require('express') //middleware that our whole app depends on.
var mongoose = require('mongoose') //module used to communicate with Mongo Database.
var cors = require('cors') //using cors() in line 31 allows other domains to access our api (server).

var app = express() //initializes our app as an express app.

var bodyParser = require('body-parser') //bodyParser allows us to access the body of a json that we send from a client to this server.
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

//set our port to be PORT in our .env file or 5000.
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// 'views' is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors()) 

// http://localhost:5000/ sends us to index.html in views/pages/
// By going to the URL, we make a GET request. (app.get)
// ('/' indicates that it is base URL. localhost:5000/ <--)
app.get('/', function(request, response) {
  response.render('pages/index');
});

//Router allows us to provide instructions for
// other URL paths from base localhost:5000/
var router = express.Router()
router.get('/', function (req, res) { //   (http://..../) base url for this router returns a JSON of string 'API'
  res.json({ message: 'API' })
})
router.use('/users', require('./routes/users.js')) //  (http://..../users) path executes code in users.js in routes folder (Look there).

app.use('/api', router) // our app uses this router for the localhost:5000/api/ path.
                        // this means our (http://..../users) URL is accessed by localhost:5000/api/users.


app.listen(app.get('port'), function() { //listen starts our server at port 5000.
  console.log('Node app is running on port', app.get('port')); //prints message on terminal.
});




