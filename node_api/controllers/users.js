var userModel = require('../models/users');

function users() {

	this.get = function(cb){
		userModel.get(cb);
	}

}

module.exports = new users();