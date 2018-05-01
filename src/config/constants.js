export default {
  PORT: process.env.PORT || 5000,
  GRAPHQL_PATH: "/graphql",
  GRAPHIQL_PATH: "/graphiql",
  SUBSCRIPTIONS_PATH: "/subscriptions",
  DB_URL: "mongodb://localhost/gqltoy",
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: "thisisasecret123"
};
