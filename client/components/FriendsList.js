import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class FriendsList extends React.Component {
  
  constructor(props){
      super(props)
      this.state = {
        invitedFriends : []
      }
  }
  friendClick(event){
    console.log(event.target.className)
    if(event.target.className === 'friend'){
      this.setState({invitedFriends:[event.target.value, ...this.state.invitedFriends]})
    }else if(event.target.className === 'friend-accept'){
      var indexRemove = this.state.invitedFriends.indexOf(event.target.value)
      var newList = this.state.invitedFriends.slice(0,indexRemove).concat(this.state.invitedFriends.slice(indexRemove+1))
      this.setState({invitedFriends: newList})
    }

    console.log(this.state.invitedFriends)
  }
  
  render(){
    console.log("PROPS",this.props.currentEvent.title)
    return(
      <div>
      Invite Friends to {this.props.currentEvent.title}
      <ul>{this.props.currentUser.friendsList.map((friend) => {
        return <li className ={this.state.invitedFriends.includes(friend.id)?"friend-accept":"friend"} key = {friend.id} value = {friend.id} onClick = {this.friendClick.bind(this)}><img src = {friend.image} className = "eventListFriendImage" /> {friend.name}</li>
      })}
      </ul>
      
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
  return bindActionCreators({})
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);