const { createServer } = require("node:http");
const { URL } = require("node:url");

const MovieController = require("./controllers/movie.controller");
const generateResponse = require("./utils/response");

const PORT = 8001;

const server = createServer(async (request, response) => {
  const { method, url } = request;

  const movieController = new MovieController(response);

  const baseURL = new URL(`http://localhost:${PORT}${url}`);

  const route = baseURL.pathname;

  if (route === "/") {
    return generateResponse(response, 200, {
      message: "Welcome to Node Vanilla API!",
    });
  }

  if (route === "/movies" && method === "GET") {
    return await movieController.getAllMovies(response, request);
  }

  // 404 - Route Not Found
  return generateResponse(response, 404, {
    error: `Route [${url}] not found!`,
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
