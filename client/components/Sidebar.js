import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

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
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0)'
  }
}


export default class Sidebar extends React.Component {
  render() {
    return (
      <Menu right styles={ styles}>
        <span>Power</span>
        <span>User</span>
        <span>Things</span>
        <span>And</span>
        <span>Stuff</span>
        <span>Edit</span>
      </Menu>
    )
  }
}