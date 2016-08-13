import React from 'react'
import ReactDom from 'react-dom'
//import io from 'socket.io-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import {addInvite} from '../actions/actions'
import { CardStack, Card } from 'react-cardstack';
import FriendsList from './FriendsList'
import GuestList from  './GuestList'

export class GuestAndFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicked: 'guestList'}
  }  

showGuestList() {
  return this.state.clicked == 'guestList' ? <div> <div className = 'guestHeader'> People Attending </div> <GuestList/> </div> : <div onClick = {this.clickGuestList.bind(this)} > expand Guest list</div>
}

clickGuestList() {
  this.setState({clicked: 'guestList'})
}

showFriendsList() {
  return this.state.clicked == 'friendsList' ? <div><div className = 'guestHeader'> Invite Friends </div> <FriendsList /> </div> : <div onClick = {this.clickFriendsList.bind(this)} > expand Friend Invites</div>
}

clickFriendsList() {
  this.setState({clicked: 'friendsList'})
}

  render() {
console.log(this.props.currentEvent)
    return(
      <div>
      {this.showGuestList()} {this.showFriendsList()}
      </div>
      )
  }

  }

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEvent: state.currentEvent
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addInvite},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestAndFriends);