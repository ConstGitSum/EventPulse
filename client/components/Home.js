import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser, getAllInvitations } from '../actions/actions';

import List from './List';
import Auth from './Auth';

export class Home extends React.Component {
  componentWillMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      // Render Auth page if not logged in, Event List if logged in
      <div className="home">
        {this.props.currentUser
         ? <List />
         : <Auth />}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCurrentUser, getAllInvitations }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
