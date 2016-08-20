import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { addInvite } from '../actions/actions';

export class FriendsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invitedFriends: [],
    };
    this.friendsNotGoing();
  }

  friendsNotGoing() {   // This checking to see which of your friends are not already going to the event
    const guestIDs = this.props.currentEvent.guests.map(guest_id => {
      return guest_id.id;
    });
    const friendIDs = this.props.currentUser.friendsList.filter(friend_id => {
      return !guestIDs.includes(friend_id.id);
    });
    return friendIDs;
  }

  friendClick(event, info) {    // toggles the friend's invite status from you.
    if (this.state.invitedFriends.includes(event)) {
      const indexRemove = this.state.invitedFriends.indexOf(event);
      const newList = this.state.invitedFriends.slice(0, indexRemove).concat(this.state.invitedFriends.slice(indexRemove + 1));
      this.setState({ invitedFriends: newList });
    } else {
      this.setState({ invitedFriends: [event, ...this.state.invitedFriends] });
    }
  }

  componentWillUnmount() {  // When you leave the page, want to empty the store's info here.
    this.props.addInvite([]);
  }

  submitInvite(event) { // This submits the invite request.
    event.preventDefault();
    const url = '/api/events/invite';
    const body = { user_id: this.props.currentUser.id, invite_ids: this.state.invitedFriends, event_id: this.props.currentEvent.id };
    this.props.addInvite(['add', this.props.currentEvent.id, this.props.currentUser.id, ...this.state.invitedFriends]);  // will go add, event_id, inviter_id, invitee_ids
    this.setState({ invitedFriends: [] });
  }

  onClickBack() {
    browserHistory.push(`/${this.props.currentEvent.id}`);
  }

  render() {
    return (
      <div>
      <ul className="friendsNotGoing">{this.friendsNotGoing().map((friend) => {
        return <li className="event-item list-group-item friend" key={friend.id} value={friend.id} onClick={this.friendClick.bind(this, friend.id)}><img src={friend.image} className="eventListFriendImage largePicture" /> {friend.name} {this.state.invitedFriends.includes(friend.id) ? <span className="glyphicon glyphicon-ok checkmark"></span> : null}</li>;
      })}
      </ul>
      <div className="inviteSpan"><button className="inviteButton" onClick={this.submitInvite.bind(this)}> Invite Friends </button> </div>
      </div>
      );
  }
  }

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addInvite }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
