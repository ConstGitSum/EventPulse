import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser, getAllInvitations } from '../actions/actions';

import List from './List';
import Auth from './Auth';

export class Home extends Component {
  componentWillMount() {
    this.props.getCurrentUser().then(() => {
      if(this.props.currentUser.id){
        this.props.getAllInvitations(this.props.currentUser.id)
      }
    })  
  }

  render() {
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
  return bindActionCreators({ getCurrentUser, getAllInvitations }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
