const gql = String.raw;

export const typeDefs = gql`
  scalar Date

  type Status {
    id: ID!
    message: String!
  }

  type Auth {
    token: String!
  }

  type User {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Me {
    _id: ID!
    username: String
    email: String!
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Tweet {
    _id: ID!
    text: String!
    user: User!
    favoriteCount: Int!
    isFavorited: Boolean
    createdAt: Date!
    updatedAt: Date!
  }

  type Score {
    _id: ID!
    teamAName: String
    teamBName: String
    teamAScore: String
    teamBScore: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Artist @cacheControl(maxAge: 60) {
    id: ID
    name: String
    image: String
    twitterUrl: String
    events: [Event]
  }

  type Event @cacheControl(maxAge: 60) {
    name: String
    image: String
    startDateTime: String
  }

  type Person {
    name: String
    height: String
    mass: String
    hair_color: String
    skin_color: String
    eye_color: String
    birth_year: String
    gender: String
    films: [Film]
  }

  type Film {
    title: String
    episode_id: Int
    director: String
    producer: String
  }

  type Query {
    getScores: [Score]
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
    getUserTweets: [Tweet]
    me: Me
    myFavoriteArtists: [Artist]
    getPerson(id: Int!): Person
  }

  type Mutation {
    createScore(
      teamAName: String
      teamBName: String
      teamAScore: String
      teamBScore: String
    ): Score
    addTweet(text: String!): Tweet
    createTweet(text: String!): Tweet
    updateTweet(_id: ID!, text: String): Tweet
    deleteTweet(_id: ID!): Status
    favoriteTweet(_id: ID!): Tweet
    signup(
      email: String!
      fullName: String!
      password: String!
      avatar: String
      username: String
    ): Auth
    login(email: String!, password: String!): Auth
  }

  type Subscription {
    tweetAdded: Tweet
    tweetFavorited: Tweet
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`;
