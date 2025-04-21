import fs from "fs";
import { dirname } from "path";
import path from "path";
import { getContentType } from "../service/serverS.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const webDir = path.join(__dirname, "../../web"); // Use path.join to ensure proper path formation

function serveFilesHandler(req, res) {
  // Construct the file path
  const filePath = path.join(webDir, req.url);

  // Read the requested file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If there's an error reading the file (e.g., file not found), serve the index.html
      if (req.url !== "/") {
        const indexPath = path.join(webDir, "index.html"); // Path to index.html
        fs.readFile(indexPath, (indexErr, indexContent) => {
          if (indexErr) {
            // If there's an error reading index.html, return a 500 server error
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end("Error loading index.html");
          } else {
            // Serve the index.html file if no other file found
            const contentType = getContentType(indexPath);
            res.statusCode = 200;
            res.setHeader("Content-Type", contentType);
            res.end(indexContent);
          }
        });
      } else {
        // If the request is for the root ("/"), serve index.html
        const indexPath = path.join(webDir, "index.html");
        fs.readFile(indexPath, (indexErr, indexContent) => {
          if (indexErr) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end("Error loading index.html");
          } else {
            const contentType = getContentType(indexPath);
            res.statusCode = 200;
            res.setHeader("Content-Type", contentType);
            res.end(indexContent);
          }
        });
      }
    } else {
      // If the requested file is found, serve it with the appropriate content type
      const contentType = getContentType(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(content);
    }
  });
}

export default serveFilesHandler;
