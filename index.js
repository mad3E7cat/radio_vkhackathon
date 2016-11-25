var express = require('express');
var app = express(); // express object

app.use(express.static(__dirname + '/static')); // allows access to any file in 'public'
app.set('port', (process.env.PORT || 5000)); // set port to 5000

//views us directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response)
{
	response.sendFile(__dirname + '/index.html');
	response.sendFile(__dirname + '/static/main.b1476538.js');
	response.sendFile(__dirname + '/static/css/main.b52aa9ee.css');
	console.log("Files should have been included...epta...");
});

app.post('/DfSgTr', function(request, response){ // if POST comes to this unuque url, we answer with "1db0c94a"
	response.end('e6dda052');
});

// app.post('/', function(request, response){
//     var req = JSON.parse(request.body);
//     if(req.type == "confirmation"){
//         response.send('1db0c94a');
//     }
// });



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


