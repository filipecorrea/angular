var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Setup Express
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve the angular client
app.use('/', express.static(__dirname + '/client'));

// Features
require('./server/authentication/authentication.routes.js')(app);
require('./server/quotes/quotes.routes.js')(app);

// Start server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

	console.log('Node server running on port 3000.');
});
