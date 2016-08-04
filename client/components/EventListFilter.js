import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterEventList } from '../actions/actions';

export class EventListFilter extends React.Component {
  render() {
    const filters = ['all', 'unhidden', 'hidden', 'created', 'joined', 'pending'];

    return (
      <DropdownButton title={'Filter Events'} id={'event-filter-dropdown'}>
        {filters.map((filter, index) => 
          <MenuItem 
            key={index} 
            onClick={this.props.filterEventList.bind(
              null, 
              this.props.eventList, 
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
    eventList: state.eventList,
    hiddenEvents: state.hiddenEvents
  };
}

function mapDispatchToProps(dispatch) { 
  return bindActionCreators({ 
    filterEventList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventListFilter);
