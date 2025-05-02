import fs from "fs";
import { dirname } from "path";
import path from "path";
import { getContentType } from "../service/serverS.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const webDir = path.join(__dirname, "../../web");

function serveFilesHandler(req, res) {
  const filePath = path.join(webDir, req.url);
  fs.readFile(filePath, (err, content) => {
    if (err) {
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
    } else {
      const contentType = getContentType(filePath);
      res.statusCode = 200;
      res.setHeader("Content-Type", contentType);
      res.end(content);
    }
  });
}

export default serveFilesHandler;
