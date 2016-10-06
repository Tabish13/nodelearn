var profileModel = require('../models/profiles');

function profiles() {

	this.get = function(cb){
		profileModel.get(cb);
	}

}

module.exports = new profiles();