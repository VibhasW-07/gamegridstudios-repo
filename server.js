// Simple HTTP server to serve static HTML/CSS/JS files
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000; // Using port 5000 to match workflow

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Create a simple HTTP server to serve static files
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Get file path (handle root path as index.html)
  let filePath = req.url === '/' ? 'index.html' : req.url;
  if (filePath.startsWith('/')) {
    filePath = filePath.substring(1);
  }
  
  // Get file extension for content type
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If file not found, serve index.html
      if (err.code === 'ENOENT') {
        fs.readFile('index.html', (err, content) => {
          if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(content);
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - serve the file
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static website server running at http://0.0.0.0:${PORT}`);
  console.log('Serving HTML/CSS/JS files only - no backend processing');
});