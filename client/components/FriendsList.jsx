import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addInvite } from '../actions/actions';

export class FriendsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invitedFriends: [],
    };

    this.friendsNotGoing();

    this.submitInvite = this.submitInvite.bind(this);
  }

  // When you leave the page, want to empty the store's info here.
  componentWillUnmount() {
    this.props.addInvite([]);
  }

  // This submits the invite request.
  submitInvite(event) {
    event.preventDefault();
    // will go add, event_id, inviter_id, invitee_ids
    this.props.addInvite([
      'add',
      this.props.currentEvent.id,
      this.props.currentUser.id,
      ...this.state.invitedFriends,
    ]);
    this.setState({ invitedFriends: [] });
  }

  // toggles the friend's invite status from you.
  friendClick(event) {
    if (this.state.invitedFriends.includes(event)) {
      const indexRemove = this.state.invitedFriends.indexOf(event);
      const newList = this.state.invitedFriends
        .slice(0, indexRemove)
        .concat(this.state.invitedFriends.slice(indexRemove + 1));
      this.setState({ invitedFriends: newList });
    } else {
      this.setState({ invitedFriends: [event, ...this.state.invitedFriends] });
    }
  }

  // This checking to see which of your friends are not already going to the event
  friendsNotGoing() {
    const guestIDs = this.props.currentEvent.guests.map(guestId => guestId.id);
    const friendIDs = this.props.currentUser.friendsList.filter(friendId =>
      !guestIDs.includes(friendId.id)
    );
    return friendIDs;
  }

  render() {
    return (
      <div>
        <ul className="friendsNotGoing">{this.friendsNotGoing().map((friend) =>
          <li
            className="event-item list-group-item friend"
            key={friend.id}
            value={friend.id}
            onClick={this.friendClick.bind(this, friend.id)}
          >
            <img
              src={friend.image}
              className="eventListFriendImage largePicture"
              role="presentation"
            />
            {friend.name}{this.state.invitedFriends.includes(friend.id)
              ? <span className="glyphicon glyphicon-ok checkmark" />
              : null
            }
          </li>
        )}</ul>
        <div className="inviteSpan">
          <button
            className="inviteButton"
            onClick={this.submitInvite}
          >Invite Friends
          </button>
        </div>
      </div>
      );
  }
}

FriendsList.propTypes = {
  addInvite: PropTypes.func.isRequired,
  currentUser: PropTypes.any.isRequired,
  currentEvent: PropTypes.object.isRequired,
};

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
