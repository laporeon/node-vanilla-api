function generateResponse(response, statusCode, data) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.write(JSON.stringify(data));

  return response.end();
}

module.exports = generateResponse;
