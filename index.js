var express = require('express');
var forceSSL = require('express-force-ssl');
var fs = require('fs');
var app = express();
var http = require('http');
var https = require('https');

var ssl_options = {
	key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
	cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
	// ca: fs.readFileSync('./keys/intermediate.crt')
};


app.use(express.static(__dirname + '/static')) // allows access to any file in 'public'
app.set('port', (process.env.PORT || 80)) // set port to 5000


app.post('/DfSgTr568rfghsdgdfh', function(request, response){ 
	console.log("REQUESTED: " + request)
	response.end('e6dda052');
});

app.get('/', function(req, resp) {
	var params = {
		api_url: req.param('api_url'),
		api_settings: req.param('api_settings'),
		viewer_id: req.param('viewer_id'),
		group_id: req.param('group_id'),
		is_app_user: req.param('is_app_user')
	}

	console.dir(params)

	resp.sendFile(__dirname + '/index.html')
})

app.get('/audio', function(req, resp) {
	console.log("audio")
})


app.get('/playlist', function(req, resp) {
	console.log("playlist")
})

app.get('/static/*', function(req, resp){
	const request = req._parsedOriginalUrl.path.slice(7)
	console.log(request)
	// console.log(tagId)
	switch(request){
		case '/main.js':
		// console.log("sending main.js")
			resp.sendFile(__dirname + '/static/js/main.js')
			break
		case '/main.css':
			// console.log("sending main.css")
			console.log(__dirname + '/static/css/main.css')
			resp.sendFile(__dirname + '/static/css/main.css')
			break
		default:
			resp.sendFile(__dirname + '/static' + request)
	}
})

// app.get('*', function(req, resp){
// 	const request = req._parsedOriginalUrl.path
// 	console.log(request)
// 	// console.log(tagId)
// 	switch(request){
// 		case '/':
// 			resp.sendFile(__dirname + '/index.html')
// 			break
// 		case '/static/main.js':
// 		// console.log("sending main.js")
// 			resp.sendFile(__dirname + '/static/js/main.js')
// 			break
// 		case '/static/main.css':
// 			// console.log("sending main.css")
// 			resp.sendFile(__dirname + '/static/css/main.css')
// 			break
// 		default:
// 			resp.sendFile(__dirname + request)
// 	}
// })

// app.get('*', function(req, resp)

// if POST comes to this unuque url, we answer with "1db0c94a"

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

var secureServer = https.createServer(ssl_options, app)

app.use(forceSSL)

secureServer.listen(80)

