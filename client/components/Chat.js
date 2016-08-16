import React from 'react'
import ReactDom from 'react-dom'
import io from 'socket.io-client'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios'


export class ChatWindow extends React.Component {
  constructor(props){
    super(props)
    this.state = {messages:[], comment:'', comments: 0, nextReplyTime: Date.now()}
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
    this.socket.emit('leaving',this.socket.id)
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
        event: this.props.event.id,
        image: this.props.currentUser.image
      }
      const timeStamp = Date.now();

      if(this.state.comments == 10){
        this.setState({nextReplyTime: timeStamp + 3000})
        this.setState({messages: [{text:'3 second timeout:  Please stop spamming'},...this.state.messages]})
        this.setState({comments: 0})
      }

      if(timeStamp > this.state.nextReplyTime+3000){
        this.setState({comments: 0})
      }

      if(timeStamp < this.state.nextReplyTime){
        this.setState({comments:this.state.comments+1})  
      }
      
      if(message.text.length !==0 && timeStamp > this.state.nextReplyTime){
      this.socket.emit('message', message)
      this.setState({nextReplyTime: timeStamp+400})
      this.setState({comment:''})
      }
      
      
  }

  render(){
    const messages = this.state.messages.map((message, index) => {
      return (
        <li className="col-xs-12 col-md-12" key={index}>
          <img className='chatImage' src={message.image} />
          <b>{message.name}</b> {message.text}
        </li>
        )
    })
    return(
      <div>
        <h1 className="text-center"> </h1>
            <form className="text-center" onSubmit = {this.handleSubmit.bind(this)}>
              <input className="col-xs-12 col-xs-offset-2 col-md-8 col-md-offset-3" type = 'text' placeholder = 'Enter a message' value = {this.state.comment} onChange ={this.handleChange.bind(this)} ></input>
            </form>
        <div className='chatBox col-xs-10'><ul className = 'chatMessages'>{messages} </ul></div>  
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