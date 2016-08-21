import React, { PropTypes } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import axios from 'axios';

export class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], comment: '', comments: 0, nextReplyTime: Date.now() };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.socket = io('/');
    const room = 'event'.concat(this.props.event.id);
    this.socket.on('connect', () => {
      this.socket.emit('room', room);
    });
    this.socket.on('message', message => {
      this.setState({ messages: [message, ...this.state.messages] });
    });
    axios.get(`/api/events/${this.props.event.id}/chat`)
          .then((messages) => {
            this.setState({ messages: [...messages.data] });
          });
  }

  componentWillUnmount() {
    this.socket.emit('leaving', this.socket.id);
    this.socket.disconnect();
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const message = {
      text: this.state.comment,
      name: this.props.currentUser.name,
      user_id: this.props.currentUser.id,
      event: this.props.event.id,
      image: this.props.currentUser.image,
    };
    const timeStamp = Date.now();

    if (this.state.comments === 10) {
      this.setState({ nextReplyTime: timeStamp + 3000 });
      this.setState({
        messages: [{ text: '3 second timeout:  Please stop spamming' }, ...this.state.messages],
      });
      this.setState({ comments: 0 });
    }

    if (timeStamp > this.state.nextReplyTime + 3000) {
      this.setState({ comments: 0 });
    }

    if (timeStamp < this.state.nextReplyTime) {
      this.setState({ comments: this.state.comments + 1 });
    }

    if (message.text.length !== 0 && timeStamp > this.state.nextReplyTime) {
      this.socket.emit('message', message);
      this.setState({ nextReplyTime: timeStamp + 400 });
      this.setState({ comment: '' });
    }
  }

  render() {
    const messages = this.state.messages.map((message, index) => (
      <li className="col-xs-12 col-md-12" key={index}>
        <img className="chatImage" role="presentation" src={message.image} />
        <b>{message.name}</b> {message.text}
      </li>)
    );
    return (
      <div>
        <form className="text-center" onSubmit={this.handleSubmit}>
          <input
            className="col-xs-12 col-xs-offset-2 col-md-8 col-md-offset-3"
            type="text"
            placeholder="Enter a message"
            value={this.state.comment}
            onChange={this.handleChange}
          />
        </form>
        <div className="chatBox col-xs-12">
          <ul className="chatMessages">{messages}</ul>
        </div>
      </div>
    );
  }
}

ChatWindow.propTypes = {
  event: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

/* istanbul ignore next */
export default connect(mapStateToProps)(ChatWindow);
