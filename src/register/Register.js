import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavLink} from "react-router-dom";
import './Register.css';

class Register extends Component {

    register() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="Register">
                <div className="col-sm-3"></div>
                <div className="register-form form-horizontal col-sm-6">
                    <h2 className="text-center">Register</h2>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="email">Email</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" id="email" placeholder="Enter email"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="pwd">Password</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="confirm">Confirm</label>
                        <div className="col-sm-8">
                            <input type="password" className="form-control" id="confirm" placeholder="Confirm password"/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-1">
                            <NavLink to="/login">Login</NavLink>
                            <button type="button" onClick={() => this.register()} className="btn btn-default">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register = connect(function (state) {
    return {...state}
})(Register);

export default Register;
