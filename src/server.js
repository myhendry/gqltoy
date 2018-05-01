import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import { ApolloEngine } from "apollo-engine";
import { makeExecutableSchema } from "graphql-tools";

import "./config/db";
import constants from "../src/config/constants";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import middlewares from "../src/config/middlewares";

const app = express();

middlewares(app);

require("dotenv").config();

if (!process.env.TM_API_KEY) {
  throw new Error(
    "Please provide an API key for Ticketmaster in the environment variable TM_API_KEY."
  );
}

if (!process.env.ENGINE_API_KEY) {
  throw new Error(
    "Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY."
  );
}

// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.post(
  constants.GRAPHQL_PATH,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    tracing: true,
    cacheControl: true,
    context: {
      user: req.user,
      secrets: {
        TM_API_KEY: process.env.TM_API_KEY
      }
    }
  }))
);

const gql = String.raw;

// Using Route Handlers
app.get("/thank", (req, res) => {
  res.send({ greeting: "Hey friend!" });
});

app.get(
  constants.GRAPHIQL_PATH,
  graphiqlExpress({
    endpointURL: constants.GRAPHQL_PATH
    // query: gql`
    //   query UpcomingEvents {
    //     myFavoriteArtists {
    //       name
    //       twitterUrl
    //       events {
    //         name
    //         startDateTime
    //       }
    //     }
    //   }
    // `
  })
);

app.use(express.static("public"));

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY,
  // logging: {
  //   level: "DEBUG"
  // },
  stores: [
    {
      name: "publicResponseCache",
      inMemory: {
        cacheSize: 10485760
      }
    }
  ],
  queryCache: {
    publicFullQueryStore: "publicResponseCache"
  }
});

// Start the app
engine.listen(
  {
    port: constants.PORT,
    expressApp: app
  },
  () => {
    console.log(
      `Go to http://localhost:${constants.PORT}/graphiql to run queries!`
    );
  }
);
