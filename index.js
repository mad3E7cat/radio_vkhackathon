var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static')) // allows access to any file in 'public'
app.set('port', (process.env.PORT || 5000)) // set port to 5000

app.get('/', function(request, response){
	console.log("REQUESTED: " + request)
	response.sendFile(__dirname + '/index.html')
});

app.get('/main.js', function(request, response){
	response.sendFile(__dirname + '/static/js/main.b1476538.js');
});

app.get('/main.css', function(request, response){
	response.sendFile(__dirname + '/static/css/main.b52aa9ee.css');
});

// if POST comes to this unuque url, we answer with "1db0c94a"
app.post('/DfSgTr', function(request, response){ 
	console.log("REQUESTED: " + request)
	response.end('e6dda052');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
