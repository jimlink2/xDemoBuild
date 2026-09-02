var http = require("http");

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.end('Testing Nodejs Application with PM2\ntada');
}).listen(80);

console.log('Server running at http://127.0.0.1:8080/');
