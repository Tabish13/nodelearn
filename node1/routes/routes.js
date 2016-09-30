var controllers = require('../controllers/controllers');

module.exports = function(app){

//For get base url	
	app.get('/getdbdata',function(req,res){
		controllers.get(function(err,result)
			{
				if(!err)
				{
					console.log(JSON.stringify(result));
					res.send(result);
				}
				else
				{
					console.log("error occured"+err);
					res.send('Error ocuured');
				}
				
			});
		

	});


// for post base url
	app.get('/',function(req,res){

		res.send('in get base url routes');

	});

	app.get('/org',function(req,res){

		res.send('in get base url routes /org');

	});


}