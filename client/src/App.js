import React, { Component } from "react";

import Board from "./components/Board";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
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
            </a>
          </p>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Board />
      </div>
    );
  }
}

export default App;
