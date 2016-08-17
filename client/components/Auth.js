import React, { Component } from 'react';


export default class Auth extends Component {
  render() {
    return (
      <div>
        <div className="background_image"></div>
        <div className="hero-container">
          <h1 className="page-header" className="auth-head">PULSE</h1>
          <a href='/api/passportFacebook/facebookLogin'>
            <button className="btn btn-large login-button">
              <span className="fa fa-facebook-official facebook-icon" aria-hidden="true"></span>
              SIGN IN
            </button>
          </a>
        </div>
      </div>
    );
  }
}
