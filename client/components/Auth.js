import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchLogState } from '../actions/actions';

class Auth extends Component {
  render() {
    return (
      <div>
        <a 
          href='/api/passportFacebook/facebookLogin' 
          onClick={this.props.fetchLogState}
          className="btn btn-primary"> 
            facebook! 
        </a>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ fetchLogState }, dispatch);
}

export default connect(null, mapDispatchToProps)(Auth);
