const http = require('http');

const requestHandler = (req, res) => {
  if (req.url === '/hello') {
    res.setHeader('Content-Type', 'text/json');
    res.writeHead(200);
    res.end('Hello from NodeJS!');
  }
};

const PORT = 3000;
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server started in <http://localhost>:${PORT}`);
});