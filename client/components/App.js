import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {fetchPulse} from '../actions/actions';


export default class App extends Component {
  onPulse() {
    this.props.fetchPulse( this.props.pulse + 1);
  }

  render() {
    return (
      <div>
        Hey Guys
        <button onClick = {this.onPulse.bind(this)}>Pulse it </button>
        {this.props.pulse} times
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({
    fetchPulse
    }, dispatch);
}

function mapStateToProps(state) { 
  return {
    pulse: state.pulse
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
