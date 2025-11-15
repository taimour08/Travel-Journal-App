const http = require('http');

http.createServer((req, res) => {
    if(req.url === '/hello') {
        res.end('Hello Page!');
    } else {
        res.end('Other Page!');
    }
}).listen(8080);
