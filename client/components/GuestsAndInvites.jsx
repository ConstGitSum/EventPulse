import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { addInvite } from '../actions/actions';
import FriendsList from './FriendsList';
import GuestList from './GuestList';

export class GuestAndFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: 'guestList' };

    this.clickFriendsList = this.clickFriendsList.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
  }

  onClickBack() {
    browserHistory.push(`/${this.props.currentEvent.id}`);
  }

  showGuestList() {
    return this.state.clicked === 'guestList'
    ? <div>
      <div
        className="expandFriendList"
        onClick={this.clickFriendsList}
      >
        <button className="btn">Show Friend Invites</button>
      </div>
      <div className="guestHeader">People Attending</div>
      <GuestList />
    </div>
    : <div
      className="expandGuestList"
      onClick={this.clickGuestList}
    >
      <button className="btn">Show Guest list</button>
    </div>;
  }

  clickGuestList() {
    this.setState({ clicked: 'guestList' });
  }

  showFriendsList() {
    return this.state.clicked === 'friendsList'
    ? <div><div className="friendHeader">Invite Friends</div><FriendsList /></div>
    : null;
  }

  clickFriendsList() {
    this.setState({ clicked: 'friendsList' });
  }

  render() {
    return (
      <div>
        <i
          onClick={this.onClickBack}
          className="back-btn fa fa-arrow-left fa-3x"
          aria-hidden="true"
        />
        <h2 className="text-center"> {this.props.currentEvent.title} </h2>
        {this.showGuestList()} {this.showFriendsList()}
      </div>
      );
  }
}

GuestAndFriends.propTypes = {
  currentEvent: PropTypes.object.isRequired,
};
/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEvent: state.currentEvent,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addInvite }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(GuestAndFriends);
