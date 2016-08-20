import React from 'react';
import ReactDom from 'react-dom';
// import io from 'socket.io-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { addInvite } from '../actions/actions';
import { CardStack, Card } from 'react-cardstack';
import FriendsList from './FriendsList';
import GuestList from './GuestList';
import { browserHistory } from 'react-router';

export class GuestAndFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: 'guestList' };
  }

  showGuestList() {
    return this.state.clicked == 'guestList' ? <div> <div className="expandFriendList" onClick={this.clickFriendsList.bind(this)}> <button className="btn"> Show Friend Invites </button> </div><div className="guestHeader"> People Attending </div> <GuestList /> </div> : <div className="expandGuestList" onClick={this.clickGuestList.bind(this)} ><button className="btn"> Show Guest list</button></div>;
  }

  clickGuestList() {
    this.setState({ clicked: 'guestList' });
  }

  showFriendsList() {
    return this.state.clicked == 'friendsList' ? <div><div className="friendHeader"> Invite Friends </div> <FriendsList /> </div> : null;
  }

  clickFriendsList() {
    this.setState({ clicked: 'friendsList' });
  }

  onClickBack() {
    browserHistory.push(`/${this.props.currentEvent.id}`);
  }

  render() {
    return (
      <div>
        <i onClick={this.onClickBack.bind(this)} className="back-btn fa fa-arrow-left fa-3x" aria-hidden="true"></i>
        <h2 className="text-center"> {this.props.currentEvent.title} </h2>
        {this.showGuestList()} {this.showFriendsList()}
      </div>
      );
  }

  }

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
