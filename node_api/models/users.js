var connection = require('../dbhandler/databaseConnector');
 
function users() {

	this.get = function(cb) {
		connection.acquire(function(err, con) {
		  con.query('select * from users', function(err, result) {
			    con.release();
			    cb(err,result);
			  });
		});
	};
 
}

module.exports = new users();