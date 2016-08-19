import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import io from 'socket.io-client';
import {addInvite, getInvitations, getAllInvitations} from '../actions/actions';

export class EventUpdate extends React.Component {  //This component sets up the socket.io connection that doesn't go away when you change pages in the app.
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.socket = io('/')   //When you mount this component, open up a connection with the server.
    this.socket.on('connect', () => {
      if(this.props.currentUser) {    //If there is a current user, make a roomm with the user's id as it's name.
        this.socket.emit('user', this.props.currentUser.id)
      }
    });
    this.socket.on('invite', invite => {    //If the server sends back an invite, add it to your invitations
        this.props.getInvitations(invite)
    })
    this.socket.on('allInvites', invite => {  //if the server sends back an array of invites, replace your invite list with it.  Only used the first time you log in.
      this.props.getAllInvitations(invite)
    })
  }

  sendInvites(invites) {  //Send the server your list of invites to an event
    if(invites[0] === 'add') {
      this.socket.emit('invite', invites.slice(1))
    }
    if(invites[0] === 'remove') {   //Send the server the event you need to be removed from as in invitee (you joined the event).
      this.socket.emit('removeInvite',invites.slice(1))
    }
  }

  render(){   //Every time this.props.invites changes, you rerender the page, which runs sendInvites again.
    this.sendInvites(this.props.invites)
    return(
      null
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    invites: state.invites,
  }
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({addInvite, getInvitations, getAllInvitations}, dispatch)
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);
