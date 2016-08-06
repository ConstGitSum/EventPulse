import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { Button } from 'react-bootstrap';

import { hideEvent, unhideEvent } from '../actions/actions';

let Menu = require('react-burger-menu').slide

let styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '97%',
    top: '2%'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0)'
  }
}


export class Sidebar extends React.Component {
  getItems() {
    let items;

    /**
     * Check to see if the current event is in hidden event
     *   True (-1) : Add Hide button to the items array
     *   False     : Add Unhide button to the items array
     * @param  {Number} this.props.hiddenEvents
     *         .indexOf(this.props.currentEvent.id)
     */
    if (this.props.hiddenEvents.indexOf(this.props.currentEvent.id) === -1) {
      items = [...items,
        [
          <Button key="hide" className="sidebar-button"
            onClick={this.onClickHide.bind(this)}
            bsStyle="primary" bsSize="large" block>
            Hide
          </Button>
        ]
      ]
    } else {
      items = [...items,
        [
          <Button key="unhide" className="sidebar-button"
            onClick={this.onClickUnhide.bind(this)}
            bsStyle="primary" bsSize="large" block>
            Unhide
          </Button>
        ]
      ]
    }

    items = [...items,
      [
        <Button key="edit1" className="sidebar-button"
          bsStyle="primary" bsSize="large" block>
          Edit
        </Button>,
        <Button key="edit2" className="sidebar-button"
          bsStyle="primary" bsSize="large" block>
          Edit
        </Button>
      ]
    ]

    return items
  }

  onClickHide() {
    this.props.hideEvent(this.props.currentEvent.id, this.props.currentUser.id)
      .then(() => browserHistory.push('/'))
      .catch(err => console.log('ERROR - onClickHide:', err))
  }

  /**
   * Current event will be unhidden for the current user
   * @return {undefined}
   */
  onClickUnhide() {
    this.props.unhideEvent(this.props.currentEvent.id, this.props.currentUser.id)
  }

  render() {
    const items = this.getItems();

    return (
      <Menu right styles={ styles }>
        {items}
      </Menu>
    )
  }
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
