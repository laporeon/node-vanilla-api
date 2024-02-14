const POST_ROUTE = /^\/(movies)\/?$/g;
const GET_ROUTE =
  /(?:\/movies\/?)?([0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12})?/;

module.exports = {
  GET_ROUTE,
  POST_ROUTE,
};
