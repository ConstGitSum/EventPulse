import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPulse, fetchLogState, userLogOut } from '../actions/actions';
import axios from 'axios';
import {Create} from './Create';

export class App extends Component {
  componentDidMount() {
    this.props.fetchLogState()
  }

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
        <button onClick={this.onPulse.bind(this)}>Pulse it</button>
        {this.props.pulse} times
        <div>
          {this.props.logState 
           ? <button 
               className="btn btn-danger" 
               onClick={this.logOut.bind(this)}> 
               Log Out
             </button> 
           : <a 
               href='/api/passportFacebook/facebookLogin' 
               className="btn btn-primary"> 
                 facebook! 
             </a>}
        </div>
        <Create />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    fetchPulse, 
    fetchLogState,
    userLogOut
  }, dispatch);
}

function mapStateToProps(state) { 
  return {
    pulse: state.pulse,
    logState: state.logState
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
