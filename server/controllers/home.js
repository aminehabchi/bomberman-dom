import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getContentType } from '../service/serverS.js';

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function homeHandler(req, res) {
    const filePath = path.join(__dirname, "../../web/index.html");

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error reading file');
        } else {
            res.statusCode = 200;
            const contentType = getContentType(filePath);
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });
}

export default homeHandler;