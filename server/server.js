import http from "http"
import routing from "./routes/Routes.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  routing(req, res)
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
