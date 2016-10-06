function hooks(){
	this.init = function(app){
		app.use(function (req, res, next) {
		    function afterResponse() {
		        res.removeListener('finish', afterResponse);
		        res.removeListener('close', afterResponse);
		        console.log("outgoing response...");
		        // action after response
		    }

		    res.on('finish', afterResponse);
		    res.on('close', afterResponse);

		    // action before request
		    console.log("incoming request...");
		    
		    // eventually calling `next()`
		    next();
		});

	}
}

module.exports = new hooks();