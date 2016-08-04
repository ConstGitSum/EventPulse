import React, { Component } from 'react';


export default class Auth extends Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1">
          <h1 className="auth-head">PULSE</h1>
            <a 
              href='/api/passportFacebook/facebookLogin' 
              className="pure-button pure-button-primary"> 
               <i className="fa fa-facebook-official" aria-hidden="true"></i> LOGIN!  
            </a>
          
        </div>
      </div>
    );
  }
}
