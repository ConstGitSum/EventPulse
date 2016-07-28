import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {fetchPulse, fetchLogState} from '../actions/actions';
import axios from 'axios'

export default class App extends Component {
  
  componentDidMount(){
    axios.get('/api/auth/loggedIn').then((logState)=>{
      this.props.fetchLogState(logState.data)
    })
  }
  onPulse(event) {
    event.preventDefault();
    console.log(this.props.logState)
    this.props.fetchPulse( this.props.pulse + 1);
  }
  logOut(event){
    event.preventDefault();
    axios.post('/api/auth/logOut').then((logState) =>{
      this.props.fetchLogState(logState.data)
    })
  }

  render() {
    return (
      <div>
        Hey Guys
        <button onClick = {this.onPulse.bind(this)}>Pulse it </button>
        {this.props.pulse} times
        <div>
        {this.props.logState ? <button className = "btn btn-danger" onClick = {this.logOut.bind(this)}> Log Out</button> : <a href = '/api/passportFacebook/facebookLogin' className = "btn btn-primary" > facebook! < /a>}
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({
    fetchPulse, fetchLogState
    }, dispatch);
}

function mapStateToProps(state) { 
  return {
    pulse: state.pulse,
    logState: state.logState
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
