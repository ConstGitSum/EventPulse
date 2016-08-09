import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterList } from '../actions/actions';

export class ListFilter extends React.Component {
  render() {
    const filters = ['all', 'unhidden', 'hidden', 'created', 'joined', 'pending'];

    return (
      <DropdownButton title={'Filter Events'} id={'event-filter-dropdown'}>
        {filters.map((filter, index) => 
          <MenuItem 
            key={index} 
            onClick={this.props.filterList.bind(
              null, 
              this.props.list,
              filter,
              this.props.currentUser.id,
              this.props.hiddenEvents
            )}>
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
    hiddenEvents: state.hiddenEvents
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    filterList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
