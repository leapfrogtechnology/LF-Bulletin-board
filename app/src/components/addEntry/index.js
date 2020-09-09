import swal from 'sweetalert';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';

import regex from '../../constants/regex';

import { getErrorMessage } from '../../utils/utils';

import modalStyle from '../../assets/modalStyle.css';

import * as bulletinService from '../../services/bulletinService';

const defaultFormData = {
  url: '',
  title: '',
  activeStatus: true,
  duration: ''
};

/**
 *
 * @class AddEntry
 * @augments {Component}
 */
class AddEntry extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      formdata: defaultFormData
    };
  }

  /**
   * Handle Submit.
   *
   * @param {*} event
   * @memberof AddEntry
   */
  handleSubmit(event) {
    event.preventDefault();

    const params = this.state.formdata;

    if (params && params.url) {
      const youtubeFound = params.url.match(regex.YOUTUBE_REGEX);

      if (youtubeFound !== null) {
        const youtubeId = youtubeFound[2];
        const newYoutubeURL = `https://www.youtube.com/embed/${youtubeId}?controls=0&autoplay=1&mute=1&loop=1&playlist=${youtubeId}`;

        params.url = newYoutubeURL;
      }
    }

    bulletinService
      .addBulletin(params)
      .then(() => {
        this.props.refreshList();
        this.closeModal();
        this.setState({
          formdata: defaultFormData
        });
      })
      .catch((err) => swal(getErrorMessage(err)));
  }

  /**
   * Handle Change.
   *
   * @param {*} el
   * @memberof AddEntry
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
   * Handle Checkbox Change.
   *
   * @param {*} el
   * @memberof AddEntry
   */
  handleCheckboxChange(el) {
    const formData = Object.assign({}, this.state.formdata);

    formData.activeStatus = el.target.checked;

    this.setState({
      formdata: formData
    });
  }

  /**
   * Open Modal.
   *
   * @memberof AddEntry
   */
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  /**
   * Close Modal.
   *
   * @memberof AddEntry
   */
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    return (
      <div>
        <Button className="add-entry-button" bsStyle="primary" onClick={() => this.openModal()}>
          <span>Add</span>
          <i className="icon ion-md-add"></i>
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
          onRequestClose={() => this.closeModal()}
          style={modalStyle}
          content-label="add entry modal"
        >
          <h2 className="add-entry-heading">Add New Entry</h2>
          <form className="add-entry-form" onSubmit={(event) => this.handleSubmit(event)}>
            <FormGroup>
              <ControlLabel>Segment Title</ControlLabel>
              <FormControl
                id="title"
                name="title"
                type="text"
                placeholder=""
                value={this.state.formdata.title}
                onChange={(el) => this.handleChange(el)}
              />
            </FormGroup>
            <div className="two-col-fields-wrapper">
              <FormGroup>
                <ControlLabel>Duration (In Second)</ControlLabel>
                <FormControl
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder=""
                  value={this.state.formdata.duration}
                  onChange={(el) => this.handleChange(el)}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Active Status</ControlLabel>
                <Checkbox
                  checked={this.state.formdata.activeStatus}
                  onChange={(el) => this.handleCheckboxChange(el)}
                  className="scale-checkbox"
                />
              </FormGroup>
            </div>

            <FormGroup>
              <ControlLabel>Url</ControlLabel>
              <FormControl
                id="url"
                name="url"
                type="text"
                placeholder=""
                value={this.state.formdata.url}
                onChange={(el) => this.handleChange(el)}
              />
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

AddEntry.propTypes = {
  refreshList: PropTypes.func.isRequired
};

export default AddEntry;
