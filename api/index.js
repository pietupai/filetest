import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer(async (req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  
  if (req.method === 'GET' && (req.url === '/' || req.url === '/api/index.js')) {
	console.log("Received request: Branch GET / tai /api/index.js");
    //let filePath = path.join(process.cwd(), 'koe.txt');
    let filePath = path.join("/tmp/", 'koe.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Virhe tiedostoa luettaessa');
      } else {
        //res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(data);
      }
    });
  } else if (req.method === 'GET' && req.url === '/k') {
	console.log("Received request: Branch GET /k");
    res.writeHead(302, { 'Location': '/public/test-client.html' });
    res.end();
  } else if (req.method === 'POST' && (req.url === '/k' || req.url === '/api/index.js')) {
	console.log("Received request: Branch POST /k tai /api/index.js");
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      let contentToWrite = JSON.parse(body).content;
      //let filePath = path.join(process.cwd(), 'koe.txt');
      let filePath = path.join("/tmp/", 'koe.txt');
      console.log("filePath:", filePath);
      fs.writeFile(filePath, contentToWrite, 'utf8', (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Virhe tiedostoon kirjoittamisessa');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Tiedostoon kirjoittaminen onnistui!');
        }
      });
    });
  } else if (req.method === 'GET' && req.url === '/public/test-client.html') {
	console.log("Received request: Branch GET /public/test-client.html");
    // Serve the static HTML file
    let filePath = path.join(process.cwd(), 'public', 'test-client.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Virhe tiedostoa luettaessa');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    console.log(`Route not found: ${req.method} ${req.url}`);
    //res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end('Reittiä ei löydy');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
