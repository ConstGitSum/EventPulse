import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { addInvite, getInvitations, getAllInvitations } from '../actions/actions';

// This component sets up the socket.io connection
// that doesn't go away when you change pages in the app.
export class EventUpdate extends React.Component {
  componentDidMount() {
    // When you mount this component, open up a connection with the server.
    this.socket = io('/');
    this.socket.on('connect', () => {
      // If there is a current user, make a roomm with the user's id as it's name.
      if (this.props.currentUser) {
        this.socket.emit('user', this.props.currentUser.id);
      }
    });
    // If the server sends back an invite, add it to your invitations
    this.socket.on('invite', invite => {
      this.props.getInvitations(invite);
    });
    // if the server sends back an array of invites, replace your invite list with it.
    // Only used the first time you log in.
    this.socket.on('allInvites', invite => {
      this.props.getAllInvitations(invite);
    });
  }

  // Send the server your list of invites to an event
  sendInvites(invites) {
    if (invites[0] === 'add') {
      this.socket.emit('invite', invites.slice(1));
    }
    // Send the server the event you need to be removed from as in invitee (you joined the event).
    if (invites[0] === 'remove') {
      this.socket.emit('removeInvite', invites.slice(1));
    }
  }

  // Every time this.props.invites changes, you rerender the page, which runs sendInvites again.
  render() {
    this.sendInvites(this.props.invites);
    return (
      null
    );
  }
}

EventUpdate.propTypes = {
  currentUser: PropTypes.any,
  getInvitations: PropTypes.func,
  getAllInvitations: PropTypes.func,
  invites: PropTypes.array,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    invites: state.invites,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addInvite, getInvitations, getAllInvitations }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);
