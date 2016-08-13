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
  console.log('hello')
  //return <GuestList />
  return <div onClick = {this.clickGuestList.bind(this)}><GuestList/> </div>
}

clickGuestList() {
  this.setState({clicked: 'friendsList'})
}

showFriendsList() {
  return <div onClick = {this.clickFriendsList.bind(this)}><FriendsList /> </div>
}

clickFriendsList() {
  this.setState({clicked: 'guestList'})
}

  render() {
console.log(this.props.currentEvent)
    return(
      <div>
      {this.state.clicked == 'guestList' ? this.showGuestList() : this.showFriendsList()}
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