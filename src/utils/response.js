function generateResponse(response, statusCode, data) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,PUT,DELETE"
  );
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.write(JSON.stringify(data));

  return response.end();
}

module.exports = generateResponse;
