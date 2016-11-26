var express = require('express')
var forceSSL = require('express-force-ssl')
var fs = require('fs')
var app = express()
var validate = express()
var http = require('http')
var https = require('https')
var request = require('request')

const ACCESS_TOKEN = '663c6234444d392c6f17fb43f78a17b4b8078514dcd35c9bf17a3a20be2a4766abd55d4e26373e3fc766b'
var userParams

/*
*	Config
*/


var ssl_options = {
	key: fs.readFileSync('/etc/letsencrypt/live/team3.vkhackathon.ru/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/team3.vkhackathon.ru/cert.pem'),
}

app.use(express.static(__dirname + '/static')) // allows access to any file in 'public'
app.set('port', (process.env.PORT || 443)) // set port to 5000


/*
*	Incoming request
*/

validate.post('/DfSgTr568rfghsdgdfh', function(request, response){ 
	console.log("REQUESTED: " + request)
	console.log(request)
	response.end('e6dda052')
	fs()
})

app.get('/', function(req, resp) {
	userParams = {
		api_url: req.param('api_url'),
		api_settings: req.param('api_settings'),
		viewer_id: req.param('viewer_id'),
		group_id: req.param('group_id'),
		is_app_user: req.param('is_app_user')
	}

	console.dir(userParams)
	resp.redirect('https://oauth.vk.com/authorize?client_id=133252044&display=popup&redirect_uri=https://77.244.216.252/authorized&scope=8&response_type=code&v=5.60')
})

app.get('/authorized', function (req, resp) {
	userParams.code = req.param('code')
	console.log(userParams.code)
	resp.sendFile(__dirname + '/index.html')
	
	request('https://api.vk.com/method/audio.get?group_id=-133252044&access_token=' + userParams.code + '&v=5.60', function (error, response, body) {
		console.log('body:')
		console.log(body)
	})
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

/*
*	Listen
*/

var server = https.createServer(ssl_options, app).listen(443)
console.log("HTTPS listen at port 443")

var validateServer = validate.listen(80)
console.log("HTTP validate server listen at port 80")
/*
*	Processing
*/
