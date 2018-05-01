import fetch from "node-fetch";
import GraphQLDate from "graphql-date";

import Tweet from "../../models/Tweet";
import Score from "../../models/Score";
import User from "../../models/User";
import { requireAuth } from "../../services/auth";

const resolveFilms = person => {
  const promises = person.films.map(async url => {
    const res = await fetch(url);
    return res.json();
  });

  return Promise.all(promises);
};

export const resolvers = {
  Date: GraphQLDate,
  Query: {
    getTweets: async (root, args, { user }) => {
      try {
        await requireAuth(user);
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
    },
    me: async (_, args, { user }) => {
      try {
        const me = await requireAuth(user);
        return me;
      } catch (error) {
        throw error;
      }
    },
    getScores: (root, args, context) => {
      try {
        const scores = Score.find({}).sort({ createdAt: -1 });
        return scores;
      } catch (error) {
        throw error;
      }
    },
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
              return Object.assign({ name, id }, data);
            });
        })
      );
    },
    getPerson: async (root, { id }, context) => {
      const response = await fetch(`https://swapi.co/api/people/${id}/`);
      return response.json();
    }
  },
  Mutation: {
    signup: async (_, { fullName, ...rest }) => {
      try {
        const [firstName, lastName] = fullName.split(" ");
        const user = await User.create({ firstName, lastName, ...rest });
        return {
          token: user.createToken()
        };
      } catch (error) {
        throw error;
      }
    },
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not exist!");
        }
        if (!user.authenticateUser(password)) {
          throw new Error("Password not match!");
        }
        return {
          token: user.createToken()
        };
      } catch (error) {
        throw error;
      }
    },
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
    },
    createScore: async (root, args, context) => {
      try {
        const score = await Score.create({ ...args });

        return score;
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
  },
  Person: {
    films: resolveFilms,
    vehicles: person => {
      const promises = person.vehicles.map(async url => {
        const res = await fetch(url);
        return res.json();
      });

      return Promise.all(promises);
    },
    homeworld: async person => {
      const res = await fetch(person.homeworld);
      return res.json();
    }
  },
  Planet: {
    films: resolveFilms
  },
  Vehicle: {
    pilots: vehicle => {
      const promises = vehicle.pilots.map(async url => {
        const res = await fetch(url);
        return res.json();
      });

      return Promise.all(promises);
    }
  }
};

// A list of artists for whom I want to know about upcoming events
const myFavoriteArtists = [
  { name: "Kansas", id: "K8vZ9171C-f" },
  { name: "Lil Yachty", id: "K8vZ9174v57" },
  { name: "Jason Mraz", id: "K8vZ9171CVV" }
];
