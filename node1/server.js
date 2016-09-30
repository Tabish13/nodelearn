var express = require('express');
var app = express();

require('./routes/routes')(app);
var connection = require('./dbhandler/dbconnection.js');

connection.init();

var server = app.listen(3000,function(){
	var hostname = server.address().address;
	var port = server.address().port;
	console.log('server running servr at http://%s%s',hostname,port);
});
