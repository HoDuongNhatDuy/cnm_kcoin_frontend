import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import {createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import Reducer from './Reducer'
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import Register from "./register/Register";
import ResetPassword from "./reset_password/ResetPassword";
import AccountActiveRedirect from "./register/AccountActiveRedirect";

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
                          <Route exact path="/resetpassword" component={ResetPassword}></Route>
                          <Route exact path="/register" component={Register}></Route>
                          <Route path="/account-activate-redirect" component={AccountActiveRedirect}></Route>
                      </div>
                  </BrowserRouter>
              </div>
          </Provider>
      );
  }
}

export default App;
