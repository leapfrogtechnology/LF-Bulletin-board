import swal from 'sweetalert';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox } from 'react-bootstrap';

import * as bulletinService from '../../services/bulletinService';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class EditEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      formdata: {
        title: this.props.item.title,
        duration: this.props.item.duration,
        url: this.props.item.url,
        activeStatus: this.props.item.activeStatus
      }
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const params = this.state.formdata;

    params.owner = this.props.item.owner;

    bulletinService
      .editBulletin(this.props.item.id, params)
      .then(() => {
        this.closeModal();
        this.props.refreshList();
      })
      .catch(err => {
        swal(err.response.data.error.details[0].message);
      });
  }

  handleChange(el) {
    const inputName = el.target.name;
    const inputValue = el.target.value;
    const tempObj = Object.assign({}, this.state.formdata);

    tempObj[inputName] = inputValue;
    this.setState({
      formdata: tempObj
    });
  }

  handleCheckboxChange(el) {
    const formData = Object.assign({}, this.state.formdata);

    formData.activeStatus = el.target.checked;

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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.formdata.activeStatus !== this.props.item.activeStatus) {
      this.setState({
        formdata: {
          title: this.props.item.title,
          duration: this.props.item.duration,
          url: this.props.item.url,
          activeStatus: this.props.item.activeStatus
        }
      });
    }
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
          <h2>Edit Bulletin</h2>
          <form className="add-entry-form" onSubmit={event => this.handleSubmit(event)}>
            <FormGroup>
              <ControlLabel>Segment Title</ControlLabel>
              <FormControl
                id="title"
                name="title"
                type="text"
                placeholder=""
                value={this.state.formdata.title}
                onChange={el => this.handleChange(el)}
              />
            </FormGroup>
            <div className="two-col-fields-wrapper">
              <FormGroup>
                <ControlLabel>Duration</ControlLabel>
                <FormControl
                  id="duration"
                  name="duration"
                  type="text"
                  placeholder=""
                  value={this.state.formdata.duration}
                  onChange={el => this.handleChange(el)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Active Status</ControlLabel>
                <Checkbox checked={this.state.formdata.activeStatus} onChange={el => this.handleCheckboxChange(el)} />
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

EditEntry.propTypes = {
  item: PropTypes.object,
  refreshList: PropTypes.func
};

export default EditEntry;
