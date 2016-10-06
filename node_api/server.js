var express = require('express');
var config = require('config');
var bodyParser = require('body-parser');
var app = express();
var serveStatic = require('serve-static');
var winston = require('winston');
var config = require('config.json')('./config.json');
var errorhandler = require('errorhandler');
var utilities = require('./utils/util');
var hooks = require('./hooks');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//applying hooks to every req and res
hooks.init(app);

utilities.init();

var connection = require('./dbhandler/databaseConnector');
connection.init();

//setting error handlers
if (config && config.Environment) {
    if (config.Environment == "development") {
        app.use(errorhandler({ log: true }));
    } else {
        app.use(errorhandler());
    }
    console.log("Running the server in " + config.Environment + " environment");
}

require('./routes/routes')(app);

/**
 * The server class creates the server and routes all the requests to routes
 *
 * @module server
 */

var server = app.use(serveStatic(__dirname)).listen(3000, function() {

    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening at http://%s:%s", host, port);

});

module.exports = app;
