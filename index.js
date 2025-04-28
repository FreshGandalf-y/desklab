const http = require('http');
const fs = require('fs');
const path = require('path');
const { setupWebSocket } = require('./websocket.js');

const publicDir = path.join(__dirname, 'public');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('mistake: honor not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    };
  });
};


const server = http.createServer((req, res) => {
  var filePath;

  if (req.url === '/') {                                                                      // url = '/'
    filePath = path.join(__dirname, 'index.html');
  } else {                                                                                    // else {the rest}
    const requestedPath = decodeURIComponent(req.url);
    filePath = path.join(publicDir, requestedPath)
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.exists(filePath, (exists) => {
    if (exists) {
      serveFile(filePath, contentType, res);
      console.log('file sendet:', req.url);
    } else {
      
      const errorFile = path.join(publicDir, '404.html');

      fs.exists(errorFile, (hasCustom404) => {
        if (hasCustom404) {
          fs.readFile(errorFile, (err, content) => {
            res.statusCode = 404; 
            res.setHeader('Content-Type', 'text/html');
            res.end(content);
          });
        } else {
          console.log('\x1b[33mwhere is the 404 page???\x1b[0m');
          res.statusCode= 404;
          res.setHeader('Content-Type', 'text/plain');
          res.end('404: your honor does not found')
        }
      });
      console.log('404 not found:', req.url)
    };
  })
});

setupWebSocket(server);                                                                       // require websocket ^ ist oben

server.listen(1337, () => {
  console.log('\x1b[33mserver running at http://localhost:1337\x1b[0m:');
});

