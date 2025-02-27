import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer(async (req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);

  if (req.method === 'GET' && (req.url === '/' || req.url === '/api/index.js')) {
    console.log('Handling GET request for:', req.url);
    let filePath = path.join(process.cwd(), 'koe.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Virhe tiedostoa luettaessa');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && (req.url === '/k' || req.url === '/api/index.js')) {
    console.log('Handling POST request for:', req.url);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      let contentToWrite = JSON.parse(body).content;
      let filePath = path.join(process.cwd(), 'koe.txt');
      fs.writeFile(filePath, contentToWrite, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Virhe tiedostoon kirjoittamisessa');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Tiedostoon kirjoittaminen onnistui!');
        }
      });
    });
  } else if (req.method === 'GET' && req.url === '/public/test-client.html') {
    // Serve the static HTML file
    console.log('Serving static HTML file:', req.url);
    let filePath = path.join(process.cwd(), 'public', 'test-client.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Virhe tiedostoa luettaessa');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    console.log('Route not found:', req.method, req.url);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Reittiä ei löydy');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
