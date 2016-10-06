var express = require('express')
var contentDisposition = require('content-disposition')
var serveStatic = require('serve-static')
 
var app = express()
/*app.get('/',function(req,res)
{
	res.send("hey in 3000");
});
 */


app.use(serveStatic('public/ftp', {'index': ['index.html']}));

//to make downloadable
/*function setHeaders(res, path) {
	console.log(path);
  res.setHeader('Content-Disposition', contentDisposition(path))
}*/
//console.log(path);
app.use(serveStatic('public/image',{'index':false}));
//console.log(path);
app.listen(3000)