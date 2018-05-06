import { gql } from "apollo-boost";

export const GET_TWEETS = gql`
  {
    getTweets {
      text
      _id
      createdAt
    }
  }
`;
