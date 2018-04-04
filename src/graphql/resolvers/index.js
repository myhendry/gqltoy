import GraphQLDate from "graphql-date";

import { TweetResolvers } from "./tweet-resolvers";
// import UserResolvers from './user-resolvers';
// import User from '../../models/User';

export const resolvers = {
  Date: GraphQLDate,
  //   Tweet: {
  //     user: ({ user }) => User.findById(user),
  //   },
  Query: {
    // getTweet: TweetResolvers.getTweet,
    // getTweets: TweetResolvers.getTweets,
    // getUserTweets: TweetResolvers.getUserTweets,
    // me: UserResolvers.me
  },
  Mutation: {
    addTweet: TweetResolvers.addTweet
    // updateTweet: TweetResolvers.updateTweet,
    // deleteTweet: TweetResolvers.deleteTweet,
    // favoriteTweet: TweetResolvers.favoriteTweet,
    // signup: UserResolvers.signup,
    // login: UserResolvers.login
  }
  //   Subscription: {
  //     tweetAdded: TweetResolvers.tweetAdded,
  //     tweetFavorited: TweetResolvers.tweetFavorited
  //   }
};
