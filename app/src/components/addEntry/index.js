import swal from 'sweetalert';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Checkbox} from 'react-bootstrap';

import * as bulletinService from '../../services/bulletinService';

const modalStyle = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const emptyFormData = {
  url: '',
  title: '',
  priority: '',
  activeStatus: true,
  duration: ''
};

class AddEntry extends Component {

  constructor () {
    super();

    this.state = {
      modalIsOpen : false,
      formdata: emptyFormData
    };
  }
  
  handleSubmit (event) {
    event.preventDefault();

    let params = this.state.formdata;

    bulletinService.addBulletin(params)
      .then(() => {
        this.props.refreshList();
        this.closeModal();
        this.setState({
          formdata: emptyFormData
        });
      }).catch((err) => {
        swal(err.response.data.error.details[0].message);
      });
  }

  handleChange (el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let formData = Object.assign({}, this.state.formdata);

    formData[inputName] = inputValue;

    this.setState({
      formdata: formData
    });
  }

  handleCheckboxChange (el) {
    let formData = Object.assign({}, this.state.formdata);
    formData.activeStatus = el.target.checked;

    this.setState({
      formdata: formData
    });
  }

  openModal () {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal () {
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
              <FormControl id="title" name="title" type="text" placeholder=""
                value={this.state.formdata.title}
                onChange={(el) => this.handleChange(el)}
              />
            </FormGroup>
            <div className="priority-duration-wrapper">
              <FormGroup>
                <ControlLabel>Priority</ControlLabel>
                <FormControl id="priority" name="priority" type="text" placeholder=""
                  value={this.state.formdata.priority}
                  onChange={(el) => this.handleChange(el)}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Duration</ControlLabel>
                <FormControl id="duration" name="duration" type="text" placeholder=""
                  value={this.state.formdata.duration}
                  onChange={(el) => this.handleChange(el)}                
                />
              </FormGroup>
            </div>

            <FormGroup>
              <ControlLabel>Url</ControlLabel>
              <FormControl id="url" name="url" type="text" placeholder=""
                value={this.state.formdata.url}
                onChange={(el) => this.handleChange(el)}                
              />
            </FormGroup>
            <FormGroup>
            <ControlLabel>Active Status</ControlLabel>
            <Checkbox 
              checked={this.state.formdata.activeStatus}
              onChange={(el) => this.handleCheckboxChange(el)}
            />
            </FormGroup>
            <div className="form-buttons-wrapper">
              <Button className="cancel-button" bsStyle="default" onClick={() => this.closeModal()}>CANCEL</Button>
              <Button className="submit-button" bsStyle="primary" type="submit">ADD</Button>
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
