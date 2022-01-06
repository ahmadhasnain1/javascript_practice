var http = require('http');
var dt = require('./first_module');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!\n');
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);