import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/index.js') {
    let filePath = path.join(process.cwd(), 'koe.txt');
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Virhe tiedostoa luettaessa');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/api/index.js') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      let contentToWrite = JSON.parse(body).content;
      let filePath = path.join(process.cwd(), 'koe.txt');
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
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Reittiä ei löydy');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
