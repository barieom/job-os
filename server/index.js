var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initiates connection to a database somewhere
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/5000';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});
var vCheck = ["JANET", "lGhCpJCE5K", "K9m65WRQyh", "3VaFZQS9Ee", "qrsXYLSLFw", "TapqFEtdFF", "FwXkFfHWwT", "E1TmLM4UO6", "6VvCKigQ21", "YTBj8wiOXz", "KiztarwO7h", "Ein4EIwThk", "5EmzPciOP1", "dPA7wAzZoe", "QMrHmCoyCE", "oRF2MrZv83", "DsRILKPCEf", "bomkcQM8oI"];

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(request, response) {
	response.set('Content-Type', 'text/html');
	var indexPage = '';
	db.collection('passengers', function(err, coll) {
		coll.find().sort({created_at: -1}).toArray(function(err, results) {
			if (!err) {
				indexPage += "<!DOCTYPE HTML><html><head><title>Not Uber</title></head><body><h1>Don't take Ubers-Take a Lyft!</h1>";
				for (var count = 0; count < results.length; count++) {
					indexPage += "<p>" + results[count].username + " requested a vehicle at " + results[count].lat + ", "  + results[count].lng + " on " + results[count].created_at +  "</p>";
				}
				indexPage += "</body></html>"
				response.send(indexPage);
			} else {
				response.send('<!DOCTYPE HTML><html><head><title>What Did You Feed Me?</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
			}
		});
	});
});

app.get('/vehicle.json', function(request, response) {
	var usrnm = request.query.username;
	if ((usrnm) && vCheck.includes(usrnm)) {
		db.collection('vehicles', function(error, col) {
			col.find({'username':usrnm}).toArray(function(error, returned) {
				if (returned.length == 0) {
					response.send({});
				} else {
					response.send(returned[0]);
				}
			});
		});
	} else {
		response.send({});
	}
});

app.post('/rides', function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var usrnm = request.body.username;
	var lat   = parseFloat(request.body.lat);
	var lng   = parseFloat(request.body.lng);
	// var lat   = request.body.lat;
	// var lng   = request.body.lng;
	// usrnm = usrnm.replace(/[^\w\s]/gi, ''); lat = lat.replace(/[^\w\s]/gi, ''); lng = lng.replace(/[^\w\s]/gi, '');
	var toIns = {
		"username" : usrnm, "lat" : lat, "lng" : lng, "created_at" : new Date(),
	};
	if (vCheck.includes(usrnm)) {
		db.collection('vehicles', function(error, coll) {
			if (error || usrnm == null || lat == null || lng == null || isNaN(lat) || isNaN(lng)) {
				response.send('{"error": "Oh no! Your vehicle data is corrupted"}');
			} else {
				coll.remove({'username' : usrnm}, function(error, removed) {
					coll.insert(toIns, function(error, saved) {
						db.collection('passengers', function(error, coll) {
							coll.find({created_at : { $gt: new Date(new Date().getTime() - 5*60*1000)}}).toArray(function(error, returned) {
								response.send({'passengers' : returned});
							});
						});
					});
				});
			};
		});
	} else {
		db.collection('passengers', function(error, coll) {
			if (error || usrnm == null || lat == null || lng == null || isNaN(lat) || isNaN(lng)) {
				response.send('{"error": "Oh no! Your passenger data is corrupted"}');
			} else {
				coll.remove({'username' : usrnm}, function(error, removed) {
					coll.insert(toIns, function(error, saved) {
						db.collection('vehicles', function(error, coll) {
							coll.find({created_at : {$gt: new Date(new Date().getTime() - 5*60*1000)}}).toArray(function(error, returned) {
								response.send({'vehicles' : returned});
							});
						});
					});
				});
			};
		});
	};

	// var info = {"vehicles":[], "passengers":[]};
	// response.send(info);
});
app.listen(process.env.PORT || 5000);
// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
// curl --data "username=JANET&lat=10&lng=10" https://vast-reef-20785.herokuapp.com/rides
// curl --data "username=JANET&lat=42.4062&lng=-71.11655" https://vast-reef-20785.herokuapp.com/rides
// curl --data 'username=lGhCpJCE5K&lat=42.4065&lng=-71.11619' https://vast-reef-20785.herokuapp.com/rides
// curl --data 'username=ManUre&lat=42.406&lng=-71.816' https://vast-reef-20785.herokuapp.com/rides
// 42.406241, -71.116552
// curl --data 'username=' https://vast-reef-20785.herokuapp.com/vehicle.json?username=Ein4EIwThk

// curl --data "username=Barry&lat=42.4062&lng=-71.11655" https://localhost:5000/rides



