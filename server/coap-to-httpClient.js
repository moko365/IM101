var server = require('./libs/coap-broker');
var cache = [];

var onmessage = function(message) {
	var obj = JSON.parse(message.data);
	cache.push(message.data);
	console.log('<DATA> ' + message.data);
};

server.start({
	onmessage: onmessage
});


/** HTTP Server */
const http = require('http');

// Create an HTTP server
var srv = http.createServer( (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});

  var data = cache.pop();

  res.end(data);
});

srv.listen(3333);