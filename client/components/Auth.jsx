import React from 'react';

export default () => (
  <div>
    <div className="background_image" />
    <div className="hero-container">
      <h1 className="page-header" className="auth-head">PULSE</h1>
      <a
        href="/api/passportFacebook/facebookLogin"
        className="pure-button pure-button-primary login-button"
      >
        <span className="fa fa-facebook-official facebook-icon" aria-hidden="true" />
          SIGN IN
      </a>
    </div>
  </div>
);
