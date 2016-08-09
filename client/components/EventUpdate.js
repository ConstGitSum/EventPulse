import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'
import io from 'socket.io-client'
import {addInvite} from '../actions/actions'

export class EventUpdate extends React.Component {
  constructor(props) {
    super(props);

  }
componentDidMount() {
    this.socket = io('/')
    this.socket.on('connect', () => {
         console.log("connected!", this.socket)
      if(this.props.currentUser) {
        this.socket.emit('user', this.props.currentUser.id)
      }
      });
    this.socket.on('invite', invite => {
        this.props.addInvite(invite)
      })
    this.socket.emit()  
}
sendInvites(invites) {
  console.log("invitessss",invites)
}

render(){
  this.sendInvites(this.props.invites)
  return(
    <div></div>
    )
}

}
 function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser: state.currentUser,
    invites: state.invites
  }
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({addInvite})
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUpdate);