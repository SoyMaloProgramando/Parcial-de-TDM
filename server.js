const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  try {
    let filePath = "";

    if (req.url === "/" || req.url === "/index.html") {
      filePath = path.join(__dirname, "index.html");
      res.writeHead(200, { "Content-Type": "text/html" });
    } else if (req.url === "/styles.css") {
      filePath = path.join(__dirname, "styles.css");
      res.writeHead(200, { "Content-Type": "text/css" });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 - Archivo no encontrado");
      return;
    }

    const content = await fs.readFile(filePath);
    res.end(content);
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 - Error del servidor");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});