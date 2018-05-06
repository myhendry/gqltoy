import React, { Component } from "react";
import { compose, graphql } from "react-apollo";

import { GET_TWEETS } from "./graphql/queries";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    console.log(this.props);
    const { loading, data: { getTweets } } = this.props;
    console.log(getTweets);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <h2>hey there!</h2>
          <p>
            Run queries at <a href="/graphiql">/graphiql</a>.
          </p>

          <p>
            Read about this{" "}
            <a href="https://github.com/apollographql/ticketmaster-rest-api-wrapper">
              server on GitHub
            </a>.
          </p>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default compose(graphql(GET_TWEETS))(App);
