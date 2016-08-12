import React, { Component } from 'react';


export default class Auth extends Component {
  render() {
    return (

      <div>
        <div className="background_image"></div>
        <div>
          <h1 className="page-header" className="auth-head">PULSE</h1>
          <a
            href='/api/passportFacebook/facebookLogin'
            className="pure-button pure-button-primary">
          <span className="fa fa-facebook-official" aria-hidden="true"></span>
            LOGIN!
          </a>
        </div>
      </div>
    );
  }
}
