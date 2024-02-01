const { createServer } = require("node:http");
const { URL } = require("node:url");
const path = require("node:path");
const fs = require("node:fs");

const generateResponse = require("./utils/response");

const PORT = 8001;

const filePath = path.resolve(__dirname, "data", "movies.json");

const server = createServer((request, response) => {
  const { method, url } = request;

  const baseURL = new URL(`http://localhost:${PORT}${url}`);

  const route = baseURL.pathname;

  if (route === "/") {
    return generateResponse(response, 200, {
      message: "Welcome to Node Vanilla API!",
    });
  }

  if (route.match("/movies") && method === "GET") {
    const params = route.split("/")[2] || "";

    if (params === "") {
      const movies = fs.readFileSync(filePath, "utf-8");
      return generateResponse(response, 200, movies);
    }

    console.log({ params });

    return generateResponse(response, 200, {
      message: `Searching for params ${params}`,
    });
  }

  // 404 - Route Not Found
  return generateResponse(response, 404, {
    error: `Route [${url}] not found!`,
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
