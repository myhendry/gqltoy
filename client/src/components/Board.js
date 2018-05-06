import React, { Component } from "react";
import { Query } from "react-apollo";

import { GET_TWEETS } from "../graphql/queries";

class Board extends Component {
  render() {
    return (
      <Query query={GET_TWEETS}>
        {({ loading, error, data: { getTweets } }) => {
          if (loading) {
            return <h3>Loading...</h3>;
          }
          if (error) {
            return <h3>Oh No!!!</h3>;
          }
          return getTweets.map(t => (
            <div>
              <h2>{t.text}</h2>
              <h3>{t._id}</h3>
              <h3>{t.createdAt}</h3>
            </div>
          ));
        }}
      </Query>
    );
  }
}

export default Board;
