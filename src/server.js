import express from "express";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import { ApolloEngine } from "apollo-engine";
import { makeExecutableSchema } from "graphql-tools";

import CONSTANTS from "../src/config/constants";
import "./config/db";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const app = express();

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
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true,
    context: {
      secrets: {
        TM_API_KEY: process.env.TM_API_KEY
      }
    }
  })
);

const gql = String.raw;

app.get(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
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

// const PORT = process.env.PORT || 3000;

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
    port: CONSTANTS.PORT,
    expressApp: app
  },
  () => {
    console.log(
      `Go to http://localhost:${CONSTANTS.PORT}/graphiql to run queries!`
    );
  }
);
