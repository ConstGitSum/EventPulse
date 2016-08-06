import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

var Menu = require('react-burger-menu').slide

export default class Sidebar extends React.Component {
  render() {
    {console.log("side")}
    return (
      <Menu right>
        <a id="home" 
          className="menu-item" 
          onClick={console.log("clicked1")}>1</a>
      </Menu>
    )
  }
}