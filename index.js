var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/static')) // allows access to any file in 'public'
app.set('port', (process.env.PORT || 5000)) // set port to 5000


app.get('*', function(req, resp){
	const request = req._parsedOriginalUrl.path
	console.log(request)

	switch(request){
		case '/':
			resp.sendFile(__dirname + '/index.html')
			break
		case '/static/main.js':
		console.log("sending main.js")
			resp.sendFile(__dirname + '/static/js/main.b1476538.js')
			break
		case '/static/main.css':
			console.log("sending main.css")
			resp.sendFile(__dirname + '/static/css/main.b52aa9ee.css')
			break
		default:
			resp.sendFile(__dirname + request)
	}

})

// if POST comes to this unuque url, we answer with "1db0c94a"
app.post('/DfSgTr', function(request, response){ 
	console.log("REQUESTED: " + request)
	response.end('e6dda052');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
