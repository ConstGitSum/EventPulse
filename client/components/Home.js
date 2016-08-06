import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '../actions/actions';

import List from './List';
import Auth from './Auth';

export class Home extends Component {
  componentWillMount() {
    this.props.getCurrentUser()
  }

  render() {
    console.log("PROPS",this.props.currentUser)
    return (
      <div>
        {this.props.currentUser 
         ? <List /> 
         : <Auth />} 
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ getCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
