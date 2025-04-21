const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const webDir = path.join(__dirname, '../web');

const server = http.createServer((req, res) => {
  // Resolve requested path
  let filePath = path.join(webDir, req.url);

  // If the path is a directory or "/", serve index.html
  if (req.url === '/' || path.extname(filePath) === '') {
    filePath = path.join(webDir, 'index.html');
  }

  // Get content type based on extension
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
  };
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // File not found or error — serve index.html fallback
      fs.readFile(path.join(webDir, 'index.html'), (fallbackErr, fallbackContent) => {
        if (fallbackErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallbackContent);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
