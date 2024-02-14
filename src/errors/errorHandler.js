function errorHandler(response, error) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,DELETE"
  );
  response.writeHead(error.statusCode, error.contentType);
  response.write(JSON.stringify({ error: error.message }));
  response.end();
}

module.exports = errorHandler;
