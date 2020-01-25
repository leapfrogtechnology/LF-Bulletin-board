import swal from 'sweetalert';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

import * as userService from '../../services/userService';
import modalStyle from '../../assets/modalStyle.css';

class EditAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      formdata: {
        email: this.props.item.email
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = this.state.formdata;

    userService
      .editUser(this.props.item.id, params)
      .then(() => {
        this.closeModal();
        this.props.refreshList();
      })
      .catch(err => {
        const error =
          err && err.response && err.response.data && err.response.data.details
            ? err.response.data.error.details[0].message
            : 'Internal Server Error';

        swal(error);
      });
  }

  handleChange(el) {
    const inputName = el.target.name;
    const inputValue = el.target.value;
    const formData = Object.assign({}, this.state.formdata);

    formData[inputName] = inputValue;
    this.setState({
      formdata: formData
    });
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <div className="edit-entry">
        <i className="icon ion-md-create" onClick={() => this.openModal()}></i>
        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          onRequestCLose={() => this.closeModal()}
          style={modalStyle}
          content-label="edit entry modal"
        >
          <h2 className="add-entry-heading">Edit Admin</h2>
          <form className="add-entry-form" onSubmit={event => this.handleSubmit(event)}>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                id="email"
                name="email"
                type="text"
                placeholder=""
                value={this.state.formdata.email}
                onChange={el => this.handleChange(el)}
              />
            </FormGroup>

            <div className="form-buttons-wrapper">
              <Button className="cancel-button" bsStyle="default" onClick={() => this.closeModal()}>
                CANCEL
              </Button>
              <Button className="submit-button" bsStyle="primary" type="submit">
                EDIT
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

EditAdmin.propTypes = {
  item: PropTypes.object,
  refreshList: PropTypes.func
};

export default EditAdmin;
