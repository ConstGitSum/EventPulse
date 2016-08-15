import React from 'react';
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { toggleChatModal } from "../actions/actions";
import Chat from "./Chat";

export class ChatModal extends React.Component {
   render() {
      return (
         <Modal show={this.props.modals.chat} onHide={this.props.toggleChatModal}>
            <Modal.Header closeButton>
              <Modal.Title>Chatroom</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
               <Chat event={this.props.currentEvent}/>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={this.props.toggleChatModal}>Close</Button>
            </Modal.Footer>
         </Modal>   
      )
   }
}

function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    modals: state.modals
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleChatModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatModal)
