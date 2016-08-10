import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import { browserHistory } from 'react-router';
import {addInvite} from '../actions/actions'

export class FriendsList extends React.Component {
  
  constructor(props){
      super(props)
      this.state = {
        invitedFriends : [],
      }
      this.friendsNotGoing();
  }

  friendsNotGoing() {   //This checking to see which of your friends are not already going to the event
    let guestIDs = this.props.currentEvent.guests.map(guest_id => {
      return guest_id.id;
    })
    let friendIDs = this.props.currentUser.friendsList.filter(friend_id => {
      return !guestIDs.includes(friend_id.id)
    })
    return friendIDs
  }

  friendClick(event) {    //toggles the friend
    if(event.target.className === 'friend'){
      this.setState({invitedFriends:[event.target.value, ...this.state.invitedFriends]})
    }else if(event.target.className === 'friend-accept'){
      var indexRemove = this.state.invitedFriends.indexOf(event.target.value)
      var newList = this.state.invitedFriends.slice(0,indexRemove).concat(this.state.invitedFriends.slice(indexRemove+1))
      this.setState({invitedFriends: newList})
    }
  }

  componentWillUnmount() {
      this.props.addInvite([])  
  }
  
  submitInvite(event) {
    event.preventDefault();
    const url = `/api/events/invite`;
    const body = { user_id: this.props.currentUser.id, invite_ids: this.state.invitedFriends, event_id: this.props.currentEvent.id };
      this.props.addInvite(['add', this.props.currentEvent.id, this.props.currentUser.id,  ...this.state.invitedFriends])  //will go add, event_id, inviter_id, invitee_ids
      //this.props.addInvite([])
      this.setState({invitedFriends: []})
    // axios.post(url,body).then(answer => {
    //   this.props.addInvite([])
    // })

  }

  onClickBack() {
    browserHistory.push(`/${this.props.currentEvent.id}`)
  }

  render(){
    return(
      <div>
      <button onClick = {this.onClickBack.bind(this)} type = 'type' className = "ed-btn back-btn btn btn-danger"> Back </button>
      Invite Friends to {this.props.currentEvent.title}
      <ul>{this.friendsNotGoing().map((friend) => {
        return <li className ={this.state.invitedFriends.includes(friend.id)?"friend-accept":"friend"} key = {friend.id} value = {friend.id} onClick = {this.friendClick.bind(this)}><img src = {friend.image} className = "eventListFriendImage" /> {friend.name}</li>
      })}
      </ul>
      <button onClick = {this.submitInvite.bind(this)}> Invite Friends </button>
      </div>
      )
  }
  }
  function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({addInvite},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);