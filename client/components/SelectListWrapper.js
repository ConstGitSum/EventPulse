import React from 'react';
import SelectList from 'react-widgets/lib/SelectList';

export default class SelectListWrapper extends React.Component {
  render() {
    return (
      <SelectList {...this.props.input}/>
    );
  }
}