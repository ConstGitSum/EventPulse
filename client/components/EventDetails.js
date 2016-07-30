import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'react-redux'

export class EventDetails extends Component {
  onEventJoin() {
    this.props.joinEvent(this.props.currentEvent.eventId, this.props.currentUser.userId)
  }
  render() {
    return (
      <div className="event-details">
        <h1>Pulse</h1>

        <div className="btn-group btn-primary" role="group">
          <button
            onClick={this.onEventJoin}
            type="button" 
            className="btn btn-primary">Join</button>
          <button 
            type="button" 
            className="btn btn-danger">Hide</button>
        </div>

        <div>
          <span className="details">Details:</span>
          <span className="attendance">#/##</span>
        </div>

        <div>
          <p>Title: {this.props.currentEvent.title}</p>
          <p>Description: {this.props.currentEvent.description}</p>
          <p>Location: {this.props.currentEvent.location}</p>
          <p>Time: {this.props.currentEvent.time}</p>
        </div>

        <button className="btn btn-primary">Chat</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)