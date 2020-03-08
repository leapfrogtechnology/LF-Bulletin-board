import swal from 'sweetalert';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';

import { getErrorMessage } from '../../utils/utils';

import modalStyle from '../../assets/modalStyle.css';

import { userRoles } from '../../constants/userRoles';

import * as userService from '../../services/userService';

const defaultFormData = {
  email: '',
  userRole: userRoles.admin
};

/**
 *
 * @class AddAdmin
 * @extends {Component}
 */
class AddAdmin extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      formdata: { ...defaultFormData }
    };
  }

  /**
   * Handle Submit.
   *
   * @param {*} event
   * @memberof AddAdmin
   */
  handleSubmit(event) {
    event.preventDefault();

    const params = this.state.formdata;

    userService
      .addUser(params)
      .then(() => {
        this.props.refreshList();
        this.closeModal();
        this.setState({
          formdata: { ...defaultFormData }
        });
      })
      .catch(err => swal(getErrorMessage(err)));
  }

  /**
   * Handle Change.
   *
   * @param {*} el
   * @memberof AddAdmin
   */
  handleChange(el) {
    const inputName = el.target.name;
    const inputValue = el.target.value;
    const formData = Object.assign({}, this.state.formdata);

    formData[inputName] = inputValue;

    this.setState({
      formdata: formData
    });
  }

  /**
   * Open Modal.
   *
   * @memberof AddAdmin
   */
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  /**
   * Close Modal.
   *
   * @memberof AddAdmin
   */
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const { userRole } = this.state.formdata;

    return (
      <div>
        <Button className="add-entry-button" bsStyle="primary" onClick={() => this.openModal()}>
          <span>Add User</span>
          <i className="icon ion-md-add"></i>
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          onRequestClose={() => this.closeModal()}
          style={modalStyle}
          content-label="add entry modal"
        >
          <h2 className="add-entry-heading">Add New Admin</h2>
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

            <FormGroup>
              <ControlLabel>User Role</ControlLabel>
              <div>
                <DropdownButton
                  id="userRole"
                  title={userRole === userRoles.superAdmin ? 'Super Admin' : 'Admin'}
                  onSelect={selectedValue => {
                    const target = {
                      name: 'userRole',
                      value: selectedValue
                    };

                    this.handleChange({ target });
                  }}
                >
                  <MenuItem eventKey={userRoles.admin} active={userRole === userRoles.admin}>
                    Admin
                  </MenuItem>
                  <MenuItem eventKey={userRoles.superAdmin} active={userRole === userRoles.superAdmin}>
                    Super Admin
                  </MenuItem>
                </DropdownButton>
              </div>
            </FormGroup>

            <div className="form-buttons-wrapper">
              <Button className="cancel-button" bsStyle="default" onClick={() => this.closeModal()}>
                CANCEL
              </Button>
              <Button className="submit-button" bsStyle="primary" type="submit">
                ADD
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

AddAdmin.propTypes = {
  refreshList: PropTypes.func.isRequired
};

export default AddAdmin;
