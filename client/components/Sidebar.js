import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { Button } from 'react-bootstrap';

import { hideEvent, unhideEvent, editEvent } from '../actions/actions';

let Menu = require('react-burger-menu').slide;

export class Sidebar extends React.Component {
  onClickGuests() {
    browserHistory.push('/guestList')
  }

  onClickEdit() {
    this.props.editEvent(this.props.currentEvent)
    browserHistory.push('/create')
  }

  onClickHide() {
    this.props.hideEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then(() => browserHistory.push('/'))
      .catch(err => console.log('ERROR - onClickHide:', err))
  }

  onClickUnhide() {
    this.props.unhideEvent(this.props.currentEvent.id, this.props.currentUser.id)
  }


  getItems() {
    const hiddenEvents = this.props.hiddenEvents
    const currentEvent = this.props.currentEvent
    const currentUser  = this.props.currentUser
    const items = [];

    if (currentUser.id !== currentEvent.created_by
      && hiddenEvents.indexOf(currentEvent.id) === -1) {
      items.push(generateButton('Hide', this.onClickHide.bind(this)));
    } else if (currentUser.id !== currentEvent.created_by) {
      items.push(generateButton('Show', this.onClickUnhide.bind(this)));
    }

    if(currentEvent.created_by === currentUser.id) {
      items.push(generateButton('Edit', this.onClickEdit.bind(this)))
    }

    items.push(generateButton('Guests', this.onClickGuests.bind(this)));

    return items;
  }

  render() {
    return (
      <Menu right>
        <ul className="event-details-sidebar">
          {this.getItems()}
        </ul>
      </Menu>
    )
  }
}

function generateButton(text, onClickFunction) {
  return (
    <li
      key={text}
      className="sidebar-button"
      onClick={onClickFunction}>
      <i className={"fa fa-2x fa-" + getFaIcon(text)}></i>
      <p>{text}</p>
    </li>
  );
}

function getFaIcon(text) {
  const iconDict = {
    'Hide': 'eye-slash',
    'Show': 'eye',
    'Edit': 'pencil',
    'Guests': 'users',
    'Invite': 'user-plus'
  };

  return iconDict[text];
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser,
    hiddenEvents: state.hiddenEvents
  }
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ editEvent, hideEvent, unhideEvent }, dispatch)
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
