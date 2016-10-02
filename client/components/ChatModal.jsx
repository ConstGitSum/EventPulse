import React, { PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleChatModal } from '../actions/actions';
import Chat from './Chat';

export class ChatModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.modals.chat} onHide={this.props.toggleChatModal}>
        <Modal.Header className="col-xs-10 col-md-11">
          <Modal.Title className="chatroom">CHATROOM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chat event={this.props.currentEvent} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-xs-3 col-xs-offset-9"
            onClick={this.props.toggleChatModal}
          >Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
  

ChatModal.propTypes = {
  modals: PropTypes.object,
  currentEvent: PropTypes.object,
  toggleChatModal: PropTypes.func,
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    modals: state.modals,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleChatModal,
  }, dispatch);
}

/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(ChatModal);
