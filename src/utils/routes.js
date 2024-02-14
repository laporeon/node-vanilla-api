const POST_ROUTE = /^\/(movies)\/?$/g;
const GET_ROUTE =
  /^\/movies(\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?\/?$/;

module.exports = {
  GET_ROUTE,
  POST_ROUTE,
};
