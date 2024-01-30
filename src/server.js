import { createServer } from "node:http";

const PORT = 8001;

const server = createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  response.write(
    JSON.stringify({
      message: "Welcome to Node Vanilla API!",
    })
  );

  response.end();
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
