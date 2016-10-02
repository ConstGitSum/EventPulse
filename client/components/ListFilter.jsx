import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterList } from '../actions/actions';

export class ListFilter extends React.Component {
  render() {
    // font awesome icons for list filters
    const filters = {
      all: 'globe',
      unhidden: 'eye-slash',
      hidden: 'eye',
      created: 'plus-circle',
      joined: 'check-circle',
    };

    return (
      // react bootstrap dropdown that maps each filter to a button with corresponding icon
      <DropdownButton title={'Filter Events'} id={'event-filter-dropdown'} className="filtering">
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
            )}
          >
            <i className={'filter-icon fa fa-'.concat(filters[filter])} aria-hidden="true" />
            {filter}
          </MenuItem>
        )}
      </DropdownButton>
    );
  }
}

ListFilter.propTypes = {
  filterList: PropTypes.func,
  list: PropTypes.array.isRequired,
  currentUser: PropTypes.any.isRequired,
  hiddenEvents: PropTypes.array.isRequired,
  location: PropTypes.object,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    list: state.list,
    hiddenEvents: state.hiddenEvents,
    location: state.map.currLocation,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    filterList,
  }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
