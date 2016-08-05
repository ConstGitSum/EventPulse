import React, { Component } from 'react';


export default class Auth extends Component {
  render() {
    return (
      <div>
        <a 
          href='/api/passportFacebook/facebookLogin' 
          className="btn btn-primary"> 
            Login with Facebook
        </a>
      </div>
    );
  }
}
