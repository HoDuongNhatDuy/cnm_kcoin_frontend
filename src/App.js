import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Callback from "./Callback";
import Login from "./Login";

class App extends Component {

  render() {
      return (
          <div className="App">
              <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
              </p>

              <BrowserRouter>
                  <div>
                      <Route exact path="/" component={Login}></Route>
                      <Route path="/callback" component={Callback}></Route>
                  </div>
              </BrowserRouter>
          </div>
      );
  }
}

export default App;
