import { Component } from 'react';
// import { setIdToken, setAccessToken, getIdToken } from './Services/AuthService';
import jwt from 'jsonwebtoken';

class Callback extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
        // setAccessToken();
        // setIdToken();
        //
        // let idToken = getIdToken();
        // let decode = jwt.decode(idToken);
        // console.log(decode.sub);
    }

    render() {
        return null;
    }
}

export default Callback;