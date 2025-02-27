import fs from 'fs';
import path from 'path';

export function GET(request) {
  let filePath = path.join(process.cwd(), 'koe.txt');
  let file = fs.readFileSync(filePath, 'utf8');
  return new Response(file, {
    headers: { 'Content-Type': 'text/html' }
  });
}
