import GraphQLDate from "graphql-date";

import { TweetResolvers } from "./tweet-resolvers";
import { ArtistResolvers } from "./artist-resolvers";
// import UserResolvers from './user-resolvers';
// import User from '../../models/User';

export const resolvers = {
  Date: GraphQLDate,
  //   Tweet: {
  //     user: ({ user }) => User.findById(user),
  //   },

  // Artist: {
  //   twitterUrl: artist => {
  //     return artist.externalLinks.twitter[0].url;
  //   },
  //   image: artist => artist.images[0].url,
  //   events: (artist, args, context) => {
  //     return fetch(
  //       `https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=${
  //         context.secrets.TM_API_KEY
  //       }&attractionId=${artist.id}`
  //     )
  //       .then(res => res.json())
  //       .then(data => {
  //         // Sometimes, there are no upcoming events
  //         return (data && data._embedded && data._embedded.events) || [];
  //       });
  //   }
  // },
  // Event: {
  //   image: event => event.images[0].url,
  //   startDateTime: event => event.dates.start.dateTime
  // },

  Query: {
    // getTweet: TweetResolvers.getTweet,
    // getTweets: TweetResolvers.getTweets,
    // getUserTweets: TweetResolvers.getUserTweets,
    // me: UserResolvers.me
    myFavoriteArtists: ArtistResolvers.myFavoriteArtists
  },
  Mutation: {
    addTweet: TweetResolvers.addTweet
    // updateTweet: TweetResolvers.updateTweet,
    // deleteTweet: TweetResolvers.deleteTweet,
    // favoriteTweet: TweetResolvers.favoriteTweet,
    // signup: UserResolvers.signup,
    // login: UserResolvers.login
  },
  //   Subscription: {
  //     tweetAdded: TweetResolvers.tweetAdded,
  //     tweetFavorited: TweetResolvers.tweetFavorited
  //   }

  Artist: {
    twitterUrl: artist => {
      return artist.externalLinks.twitter[0].url;
    },
    image: artist => artist.images[0].url,
    events: (artist, args, context) => {
      return fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=${
          context.secrets.TM_API_KEY
        }&attractionId=${artist.id}`
      )
        .then(res => res.json())
        .then(data => {
          // Sometimes, there are no upcoming events
          return (data && data._embedded && data._embedded.events) || [];
        });
    }
  },
  Event: {
    image: event => event.images[0].url,
    startDateTime: event => event.dates.start.dateTime
  }
};
