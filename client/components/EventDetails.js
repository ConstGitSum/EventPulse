import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'react-redux'

class EventDetails extends Component {
  render() {
    return (
      <div className="event-details">
        <h1>Pulse</h1>

        <div className="btn-group btn-primary" role="group">
          <button
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
    currentEvent: state.currentEvent
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    joinEvent: joinEvent
  }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails)