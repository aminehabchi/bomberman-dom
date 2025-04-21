import fs from 'fs';
import path from 'path';
import { getContentType } from '../service/serverS.js';

const webDir = path.join(__dirname, '../../web');  // Use path.join to ensure proper path formation

function serveFilesHandler(req, res) {
    // Construct the file path
    const filePath = path.join(webDir, req.url === '/' ? 'index.html' : req.url);

    // Read the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If there's an error reading the file (e.g., file not found), send a 404 response
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error reading file');
        } else {
            // If the file is found, serve it with the appropriate content type
            const contentType = getContentType(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });
}

export default serveFilesHandler;