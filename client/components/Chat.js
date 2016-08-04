import React from 'react'
import ReactDom from 'react-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export class ChatWindow extends React.Component {
  constructor(props){
    super(props)
    this.state = {messages:[], comment:''}
  }
  componentDidMount() {
      this.socket = io('/')
      this.socket.on('message', message =>{
        this.setState({messages: [message, ...this.state.messages]})
      })  
  }

  handleChange(event){
    this.setState({comment: event.target.value})
  }
  handleSubmit(event){
    event.preventDefault();
    console.log("HEY",this.props.currentUser)
      const message  = {
        body: this.state.comment,
        from: this.props.currentUser.name // user ID  Might want currentUser to have name as well
      }
      this.setState({messages: [message, ...this.state.messages ]})
      this.socket.emit('message', message)
      this.setState({comment:''})
      console.log(this.state.messages)
  }

  render(){
    const messages = this.state.messages.map((message, index) => {
      console.log("message",message)
      return <li key = {index}><b>{message.from}</b> {message.body}</li>
    })
    console.log("MESS",messages)
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