import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { Button } from 'react-bootstrap';

import { hideEvent, unhideEvent } from '../actions/actions';

let Menu = require('react-burger-menu').slide;

export class Sidebar extends React.Component {
  onClickGuests() {
  }

  onClickEdit() {
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
    const items = []; 

    if (this.props.hiddenEvents.indexOf(this.props.currentEvent.id) === -1) {
      items.push(generateButton('Hide', this.onClickHide.bind(this)));
    } else {
      items.push(generateButton('Unhide', this.onClickUnhide.bind(this)));
    }

    if(this.props.currentEvent.created_by === this.props.currentUser.id) {
      items.push(generateButton('Edit', this.onClickEdit.bind(this)))
    }

    items.push(generateButton('Guests', this.onClickGuests.bind(this)));

    return items;
  }

  render() {
    return (
      <Menu right styles={ styles }>
        {this.getItems()}
      </Menu>
    )
  }
}

function generateButton(text, onClickFunction) {
  return (
    <Button 
      key={text} 
      className="sidebar-button"
      bsStyle="primary" 
      bsSize="large" 
      block
      onClick={onClickFunction}>
      {text}
    </Button>
  );
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentUser:  state.currentUser,
    hiddenEvents: state.hiddenEvents
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ hideEvent, unhideEvent }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
