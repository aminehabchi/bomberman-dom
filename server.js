const http = require("http");
const fs = require("fs");
const path = require("path");
const socketIo = require("socket.io");
const url = require("url");

function getFileType(extname) {
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "application/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".gif":
      contentType = "image/gif";
      break;
    case ".json":
      contentType = "application/json";
      break;
  }

  return contentType; // return the content type
}

let arr = new Map();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
  
  if (pathname == "/setname") {
    const nickname = query.name;
    console.log(arr,arr.has(nickname),nickname);
    if (arr.get(nickname)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end();
    } else {
      arr.set(nickname, true);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end();
    }
    return;
  }


  let filePath = path.join(
    __dirname,
    "web",
    req.url === "/" ? "index.html" : req.url
  );

  const contentTyoe = getFileType(path.extname(filePath));

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("file note found");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": contentTyoe });
      res.write(content);
      res.end();
    }
  });
});

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (data) => {
    // Broadcast to everyone else
    socket.broadcast.emit("message", data);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
