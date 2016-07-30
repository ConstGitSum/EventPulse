import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPulse, userLogOut } from '../actions/actions';

export class EventList extends Component {
  onPulse(event) {
    this.props.fetchPulse(this.props.pulse + 1);
  }

  logOut(event) {
    this.props.userLogOut();
  }

  render() {
    return (
      <div>
        Hey Guys
        <button onClick={this.onPulse.bind(this)}>
          Pulse it
        </button>
        {this.props.pulse} times

        <button 
          className="btn btn-danger" 
          onClick={this.logOut.bind(this)}> 
          Log Out
        </button> 
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    fetchPulse, 
    userLogOut
  }, dispatch);
}

function mapStateToProps(state) { 
  return {
    pulse: state.pulse,
    logState: state.logState
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
