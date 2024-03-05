const { createServer } = require("node:http");
const { URL } = require("node:url");

const MovieController = require("./controllers/movie.controller");
const generateResponse = require("./utils/response");
const errorHandler = require("./errors/errorHandler");
const { GET_ROUTE, POST_ROUTE } = require("./utils/routes");

const PORT = 8001;

const server = createServer(async (request, response) => {
  const { method, url } = request;

  const movieController = new MovieController(response);

  const baseURL = new URL(`http://localhost:${PORT}${url}`);

  const route = baseURL.pathname;

  try {
    if (route === "/") {
      return generateResponse(response, 200, {
        message: "Welcome to Node Vanilla API!",
      });
    }

    if (method === "POST" && route.match(POST_ROUTE)) {
      return await movieController.createMovie(request);
    }

    if (method === "GET" && route.match(GET_ROUTE)) {
      const param = request.url.split("/")[2] || "";
      if (param === "") return await movieController.getAllMovies();

      return await movieController.getMovieById(param);
    }

    if (method === "PUT" && route.match(GET_ROUTE)) {
      return generateResponse(response, 404, {
        message: "PUT method isn't implemented yet",
      });
    }

    if (method === "DELETE" && route.match(GET_ROUTE)) {
      const param = request.url.split("/")[2] || "";
      return await movieController.deleteMovie(param);
    }

    // // 404 - Route Not Found
    return generateResponse(response, 404, {
      error: `Cannot ${method} ${route}`,
    });
  } catch (error) {
    errorHandler(response, error);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
