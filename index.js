var express = require('express')
var forceSSL = require('express-force-ssl')
var fs = require('fs')
var app = express()
var validate = express()
var http = require('http')
var https = require('https')
var request = require('request')

const ACCESS_TOKEN = 'e5c0e347f7a9228246e9e64a06402f5aca0f8ed751343216d4946201d818bb4d8146e58198dc2d042e14a'

var userParams

/*
*	Config
*/


var ssl_options = {
	key: fs.readFileSync('/etc/letsencrypt/live/team3.vkhackathon.ru/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/team3.vkhackathon.ru/fullchain.pem'),
}

app.use(express.static(__dirname + '/static')) // allows access to any file in 'public'
app.set('port', (process.env.PORT || 443)) // set port to 5000


/*
*	Incoming request
*/

validate.post('/DfSgTr568rfghsdgdfh', function(request, response){ 
	console.log("REQUESTED: " + request)
	console.log(request.body)
	response.end('e6dda052')
})

app.get('/', function(req, resp) {
	userParams = {
		api_url: req.paragitm('api_url'),
		api_settings: req.param('api_settings'),
		viewer_id: req.param('viewer_id'),
		group_id: req.param('group_id'),
		is_app_user: req.param('is_app_user')
	}

	console.dir(userParams)

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



// commumityPlaylist = function() {
// 	var requestParameters = {
// 		owner_id: userParams.group_id,
// 	}
// 	request('https://api.vk.com/method/audio.get?PARAMETERS&access_token=' + ACCESS_TOKEN + '&v=V')
// }()