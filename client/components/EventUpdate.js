import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import io from 'socket.io-client';
import {addInvite, getInvitations} from '../actions/actions';

export class EventUpdate extends React.Component {
  constructor(props) {
    super(props);

  }
componentDidMount() {

    this.socket = io('/')
    this.socket.on('connect', () => {
      if(this.props.currentUser) {
        this.socket.emit('user', this.props.currentUser.id)
      }
      });
    this.socket.on('invite', invite => {
        this.props.getInvitations(invite)
      })
}
sendInvites(invites) {
  console.log("this invite",invites)
  if(invites[0]=== 'add') {
    this.socket.emit('invite', invites.slice(1))
  }
  if(invites[0] === 'remove') {
    this.socket.emit('removeInvite',invites.slice(1))
  }
}

render(){
  this.sendInvites(this.props.invites)
  return(
    <div></div>
    )
}

}
 function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    invites: state.invites,
    
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({addInvite, getInvitations}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);