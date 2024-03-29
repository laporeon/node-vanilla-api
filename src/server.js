const { createServer } = require("node:http");
const { URL } = require("node:url");

const MovieController = require("./controllers/movie.controller");
const buildResponse = require("./utils/response");
const errorHandler = require("./errors/errorHandler");
const HTTPStatus = require("./utils/httpStatus");
const { GET_ROUTE, POST_ROUTE } = require("./utils/routes");

const PORT = 8001;

const server = createServer(async (request, response) => {
  const { method, url } = request;

  const movieController = new MovieController(response);

  const baseURL = new URL(`http://localhost:${PORT}${url}`);

  const route = baseURL.pathname;

  try {
    if (route === "/") {
      return buildResponse(response, HTTPStatus.OK, {
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
      return await movieController.updateMovie(request);
    }

    if (method === "DELETE" && route.match(GET_ROUTE)) {
      const param = request.url.split("/")[2] || "";
      return await movieController.deleteMovie(param);
    }

    // // 404 - Route Not Found
    return buildResponse(response, HTTPStatus.NOT_FOUND, {
      error: `Cannot ${method} ${route}`,
    });
  } catch (error) {
    errorHandler(response, error);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
