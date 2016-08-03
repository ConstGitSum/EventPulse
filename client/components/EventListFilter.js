import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class EventListFilter extends React.Component {
  render() {
    return (
      <DropdownButton title={'Filter Events'} key={1} id={`dropdown-basic-${1}`}>
        <MenuItem eventKey="1">All</MenuItem>
        <MenuItem eventKey="2" active>Not Hidden</MenuItem>
        <MenuItem eventKey="3">Hidden</MenuItem>
        <MenuItem eventKey="4">Created</MenuItem>
        <MenuItem eventKey="5">Joined</MenuItem>
        <MenuItem eventKey="6">Pending</MenuItem>
      </DropdownButton>
    );
  }
}
