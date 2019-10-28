var http = require('http');
var url = require('url');
var nodefs = require('nodefs');

console.log("Server is running at localhost:8080....");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
  var q = url.parse(req.url, true).query;
  console.log(q);
}).listen(8080);