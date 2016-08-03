import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrentUser } from '../actions/actions';

import EventList from './EventList';
import Auth from './Auth';

export class Home extends Component {
  componentWillMount() {
    this.props.fetchCurrentUser()
    console.log("State: ", this.props.currentUser)
  }

  render() {
    return (
      <div>
        {this.props.currentUser 
         ? <EventList /> 
         : <Auth />} 
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return { currentUser: state.currentUser };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ fetchCurrentUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
