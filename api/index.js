import fs from 'fs';
import path from 'path';

export function GET(request) {
  let filePath = path.join(process.cwd(), 'koe.txt');
  let file = fs.readFileSync(filePath, 'utf8');
  return new Response(file, {
    headers: { 'Content-Type': 'text/plain' }
  });
}

export function POST(request) {
  let filePath = path.join(process.cwd(), 'koe.txt');
  let contentToWrite = 'Tässä on uusi sisältö!';

  try {
    fs.writeFileSync(filePath, contentToWrite, 'utf8');
    return new Response('Tiedostoon kirjoittaminen onnistui!', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (err) {
    console.error('Virhe tiedostoon kirjoittamisessa:', err);
    return new Response('Virhe tiedostoon kirjoittamisessa', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
