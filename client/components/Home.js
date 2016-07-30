import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLogState } from '../actions/actions';

import EventList from './EventList';
import Auth from './Auth';

export class Home extends Component {
  componentWillMount() {
    this.props.fetchLogState()
  }

  render() {
    return (
      <div>
        {this.props.logState 
         ? <EventList /> 
         : <Auth />} 
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return { logState: state.logState };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ fetchLogState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
