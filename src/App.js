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
import ConfirmReset from "./reset_password/ConfirmReset";
import AccountActiveRedirect from "./register/AccountActiveRedirect";
import AdminIndex from "./admin/Index";

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
                          <Route exact path="/reset-password" component={ResetPassword}></Route>
                          <Route path="/reset-password-redirect" component={ConfirmReset}></Route>
                          <Route exact path="/register" component={Register}></Route>
                          <Route path="/account-activate-redirect" component={AccountActiveRedirect}></Route>
                          <Route path="/admin" component={AdminIndex}></Route>
                      </div>
                  </BrowserRouter>
              </div>
          </Provider>
      );
  }
}

export default App;
