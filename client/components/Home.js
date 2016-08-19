import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser, getAllInvitations } from '../actions/actions';

import List from './List';
import Auth from './Auth';

export class Home extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser()  
  }

  render() {
    return (
      <div className = 'home'>
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
  return bindActionCreators({ getCurrentUser, getAllInvitations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
