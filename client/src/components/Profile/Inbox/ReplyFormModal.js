import React, { Component } from 'react';
import { Modal, Form, Button, Header } from 'semantic-ui-react';

class ReplyFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose(e) {
    this.props.onSubmit(e, this.props.listingId, this.props.userId, this.props.senderId);
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Contact Them!</Button>}
        open={this.state.modalOpen}
        onClose={() => this.setState({ modalOpen: false })}
      >
        <Modal.Header>Contact Form</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Send Them A Message!</Header>
            <Form>
              <Form.Input
                name="title"
                label="Subject"
                placeholder="Subject"
                onChange={e => this.props.onChange(e)}
              />
              <Form.TextArea
                name="body"
                label="Message"
                placeholder="Tell them who you are and why you are contacting them..."
                onChange={e => this.props.onChange(e)}
              />
              <Button onClick={this.handleClose}>Send Message</Button>
              <Button onClick={() => { this.setState({ modalOpen: false }); }}>Cancel</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

ReplyFormModal.propTypes = {
  listingId: React.PropTypes.number.isRequired,
  userId: React.PropTypes.number.isRequired,
  senderId: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default ReplyFormModal;
