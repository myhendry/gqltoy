import fetch from "node-fetch";
import GraphQLDate from "graphql-date";

import Tweet from "../../models/Tweet";

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    myFavoriteArtists: (root, args, context) => {
      return Promise.all(
        myFavoriteArtists.map(({ name, id }) => {
          return fetch(
            `https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=${
              context.secrets.TM_API_KEY
            }`
          )
            .then(res => res.json())
            .then(data => {
              console.log("STUFF", data);
              return Object.assign({ name, id }, data);
            });
        })
      );
    },
    getPerson: async (root, { id }, context) => {
      const response = await fetch(`https://swapi.co/api/people/${id}/`);
      return response.json();
    },
    getTweets: (root, args, context) => {
      try {
        const tweets = Tweet.find({}).sort({ createdAt: -1 });
        return tweets;
      } catch (error) {
        throw error;
      }
    },
    getTweet: (root, { _id }, context) => {
      try {
        const tweet = Tweet.findById(_id);
        return tweet;
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    addTweet: async (root, args, context) => {
      try {
        const tweet = await Tweet.create({ ...args });

        return tweet;
      } catch (error) {
        throw error;
      }
    },
    updateTweet: async (root, { _id, ...rest }, context) => {
      try {
        const tweet = await Tweet.findOne({ _id });

        if (!tweet) {
          throw new Error("Not Found!");
        }

        Object.entries(rest).forEach(([key, value]) => {
          tweet[key] = value;
        });

        return tweet.save();
      } catch (error) {
        throw error;
      }
    },
    deleteTweet: async (root, { _id }, context) => {
      try {
        const tweet = await Tweet.findOne({ _id });

        if (!tweet) {
          throw new Error("Not Found!");
        }

        await tweet.remove();

        return {
          id: _id,
          message: "Delete Success!"
        };
      } catch (error) {
        throw error;
      }
    }
  },
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

// A list of artists for whom I want to know about upcoming events
const myFavoriteArtists = [
  { name: "Kansas", id: "K8vZ9171C-f" },
  { name: "Lil Yachty", id: "K8vZ9174v57" },
  { name: "Jason Mraz", id: "K8vZ9171CVV" }
];
