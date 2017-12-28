import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import Reducer from './Reducer'
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import Register from "./register/Register";

const store = createStore(Reducer, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

class App extends Component {

  render() {
      return (
          <Provider store={store}>
              <div className="App">
                  <BrowserRouter>
                      <div>
                          <Route exact path="/" component={Dashboard}></Route>
                          <Route exact path="/login" component={Login}></Route>
                          <Route exact path="/register" component={Register}></Route>
                      </div>
                  </BrowserRouter>
              </div>
          </Provider>
      );
  }
}

export default App;
