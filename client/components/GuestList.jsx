import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addInvite } from '../actions/actions';

export class GuestList extends React.Component {
  render() {
    return (
      <div>
        <ul className="totalGuests">{this.props.currentEvent.guests.map((guest) =>
          <li key={guest.id} className="event-item list-group-item guest">
            <img
              src={guest.image}
              className="largePicture eventListFriendImage"
              role="presentation"
            />
            {guest.name}
          </li>
        )}</ul>
      </div>
    );
  }
}

GuestList.propTypes = {
  currentEvent: PropTypes.object.isRequired,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentEvent: state.currentEvent,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addInvite }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(GuestList);
