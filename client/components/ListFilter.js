import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterList } from '../actions/actions';

export class ListFilter extends React.Component {
  render() {
    const filters = {
      all      : 'globe',
      unhidden : 'eye-slash',
      hidden   : 'eye',
      created  : 'plus-circle',
      joined   : 'check-circle',
      pending  : 'question-circle'
    }


    return (
      <DropdownButton title={'Filter Events'} id={'event-filter-dropdown'}>
        {Object.keys(filters).map((filter, index) =>
          <MenuItem
            key={index}
            className="capitalize dd-item"
            onClick={this.props.filterList.bind(
              null,
              this.props.list,
              filter,
              this.props.currentUser.id,
              this.props.hiddenEvents,
              this.props.location
            )}>
            <i className={"filter-icon fa fa-" + filters[filter]} aria-hidden="true"></i>
            {filter}
          </MenuItem>
        )}
      </DropdownButton>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    list: state.list,
    hiddenEvents: state.hiddenEvents,
    location: state.map.currLocation
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    filterList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);