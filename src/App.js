import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import Reducer from './Reducer'

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
                      </div>
                  </BrowserRouter>
              </div>
          </Provider>
      );
  }
}

export default App;
