import React from 'react'
import ReactDom from 'react-dom'
//import io from 'socket.io-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import {addInvite} from '../actions/actions'
import { CardStack, Card } from 'react-cardstack';
import FriendsList from './FriendsList'

export class GuestList extends React.Component {
handleCardClick() {
  return <h2> Clicked!</h2>
}
  
  render() {
    return(
      <div>
      <ul className = "guests">{this.props.currentEvent.guests.map((guest) => {
       return <li key = {guest.id} className = "guest"><img src  = {guest.image} className = "eventListFriendImage"/> {guest.name} </li>
      })} </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(GuestList);