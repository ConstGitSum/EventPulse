import React from 'react'
import ReactDom from 'react-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'

export class ChatWindow extends React.Component {
  constructor(props){
    super(props)
    this.state = {messages:[], comment:'', nextReplyTime: Date.now()}
  }
  componentDidMount() {
      this.socket = io('/')
      var room = 'event'+this.props.event.id;
      this.socket.on('connect', () => {
        this.socket.emit('room',room)
      });
      this.socket.on('message', message => {
        this.setState({messages: [message, ...this.state.messages]})
      })
      axios.get(`/api/events/${this.props.event.id}/chat`)
          .then((messages) => {
            this.setState({messages: [ ...messages.data]})
          })
      
  }

  componentWillUnmount() {
   this.socket.disconnect();     
  }

  handleChange(event){
    this.setState({comment: event.target.value})
  }
  handleSubmit(event){
    event.preventDefault();
      const message  = {
        text: this.state.comment,
        name: this.props.currentUser.name, 
        user_id: this.props.currentUser.id,
        event:this.props.event.id,
        image: this.props.currentUser.image
      }
      const timeStamp = Date.now();
      if(message.text.length !==0 && timeStamp > this.state.nextReplyTime){
      this.socket.emit('message', message)
      this.setState({nextReplyTime: timeStamp+400})
      this.setState({comment:''})
      }
      
  }

  render(){
    const messages = this.state.messages.map((message, index) => {
      return <li key = {index}><img src = {message.image} /><b>{message.name}</b> {message.text}</li>
    })
    return(
      <div>
      <h1> Hello </h1>
      <form onSubmit = {this.handleSubmit.bind(this)}>
      <input type = 'text' placeholder = 'Enter a message' value = {this.state.comment} onChange ={this.handleChange.bind(this)} ></input>
      </form>
      {messages}
      </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ChatWindow);