import React from 'react'
import ReactDom from 'react-dom'
import io from 'socket.io-client'

export default class ChatWindow extends React.Component {
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

  handleSubmit(event){
    this.setState({comment: this.state.comment.concat(event.key)})
    if(event.keyCode === 13 ){
      const message  = {
        body: this.state.comment,
        from: 'Me'
      }
      this.setState({messages: [message, ...this.state.messages]})
      this.socket.emit('message', this.state.comment)
      this.setState({comment:''})
    }
  }

  render(){
    const messages = this.state.messages.map((message, index) => {
      return <li key = {index}><b>Me:</b> {message.body}</li>
    })
    return(
      <div>
      <h1> Hello </h1>
      <input type = 'text' placeholder = 'Enter a message' value = {this.state.comment} onKeyUp ={this.handleSubmit.bind(this)}></input>
      {messages}
      </div>
      )
  }
}