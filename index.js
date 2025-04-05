const http = require('http');
const fs = require('fs');
const path = require('path');
const { setupWebSocket } = require('./websocket.js');


function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('mistake: honor not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}


const server = http.createServer((req, res) => {
  const uRl = res.url

  if (req.url === '/') {                                                                      // url = '/'

    serveFile(path.join(__dirname, 'index.html'), 'text/html',res);
    console.log('html orderd');
  } else if (req.url === '/main.js'){                                                         // url = '/main.js'
    
    serveFile(path.join(__dirname, 'public', 'main.js'), 'application/javascript', res);
    console.log('main.js orderd')
  } else if (req.url === '/styles.css') {                                                     // url = '/styles.css'

    serveFile(path.join(__dirname, 'public', 'styles.css'), 'text/css', res);
    console.log('css orderd')
  } else {                                                                                    // else = 404
    // 404 Fehlerbehandlung
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404: your honor does not found');
    console.log("Error: page does not found:", uRl);
  }
});

setupWebSocket(server);                                                                       // require websocket ^ ist oben

server.listen(1337, () => {
  console.log('\x1b[33mserver running at http://localhost:1337\x1b[0s');
});

