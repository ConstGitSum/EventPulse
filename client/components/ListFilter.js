import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { filterList } from '../actions/actions';

export class ListFilter extends React.Component {
  render() {
    const filters = ['all', 'unhidden', 'hidden', 'created', 'joined', 'pending'];

    return (
      <div class="menu">
        <div class="title" onclick="f()">John Doe <span class="fa fa-bars"></span>
          <div class="arrow"></div>
        </div>
        <div class="dropdown">
          <p>Inbox <span class="fa fa-inbox"></span></p>
          <p>Settings <span class="fa fa-gear"></span></p>
          <p>Sign Out <span class="fa fa-sign-out"></span></p>
        </div>
      </div>
    )
      {/*<DropdownButton title={'Filter Events'} id={'event-filter-dropdown'}>
              {filters.map((filter, index) => 
                <MenuItem 
                  key={index} 
                  onClick={this.props.filterList.bind(
                    null, 
                    this.props.list,
                    filter,
                    this.props.currentUser.id,
                    this.props.hiddenEvents,
                    this.props.location
                  )}>
                  {filter}
                </MenuItem>
              )}
            </DropdownButton>
          );*/}
  }
}

function f() {
  document.getElementsByClassName('dropdown')[0].classList.toggle('down');
  document.getElementsByClassName('arrow')[0].classList.toggle('gone');
  if (document.getElementsByClassName('dropdown')[0].classList.contains('down')) {
    setTimeout(function() {
      document.getElementsByClassName('dropdown')[0].style.overflow = 'visible'
    }, 500)
  } else {
    document.getElementsByClassName('dropdown')[0].style.overflow = 'hidden'
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
