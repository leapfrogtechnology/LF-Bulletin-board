import Modal from 'react-modal';
import React, { Component} from 'react';
import FontAwesome from 'react-fontawesome';
import * as bulletinService from '../../services/bulletinService';
import { FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';


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

class AddEntry extends Component {

  constructor () {
    super();

    this.state = {
      modalIsOpen : false,
      formdata: {
        title: "",
        priority: null,
        duration: null,
        url: ""
      }
    };

    this.openModal = this.openModal.bind(this); 
    this.afterOpenModal = this.afterOpenModal.bind(this); 
    this.closeModal = this.closeModal.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.handleChange = this.handleChange.bind(this); 
  }
  
  handleSubmit (event) {
    event.preventDefault();
    let params = this.state.formdata;
    bulletinService.addBulletin(params).then((response) => {
      this.props.refreshList();
      this.closeModal();
    });
  }

  handleChange (el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let tempObj = Object.assign({}, this.state.formdata);
    tempObj[inputName] = inputValue;
    this.setState({
      formdata: tempObj
    });
  }

  openModal () {
    this.setState({
      modalIsOpen: true
    });
  }

  afterOpenModal () {

  }

  closeModal () {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {

    return (
      <div>
        <Button className="add-entry-button" bsStyle="primary" onClick={this.openModal}>
          <span>Add</span>
          <FontAwesome
            className="super-crazy-colors"
            name="plus"
            size="1x"
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          />
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestCLose={this.closeModal}
          style={modalStyle}
          content-label="add entry modal"
        >
          <h2>Add New Entry</h2>
          <form className="add-entry-form" onSubmit={this.handleSubmit}>

            <FormGroup>
              <ControlLabel>Segment Title</ControlLabel>
              <FormControl id="title" name="title" type="text" placeholder="segment title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Priority</ControlLabel>
              <FormControl id="priority" name="priority" type="text" placeholder="priority"
                value={this.state.priority}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Duration</ControlLabel>
              <FormControl id="duration" name="duration" type="text" placeholder="duration"
                value={this.state.duration}
                onChange={(event) => this.setState({formdata:{duration: event.target.value}})}
                onChange={this.handleChange}                
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Url</ControlLabel>
              <FormControl id="url" name="url" type="text" placeholder="url"
                value={this.state.url}
                onChange={this.handleChange}                
              />
            </FormGroup>
            <Button className="submit-button" bsStyle="primary" type="submit">Submit</Button>
            <Button className="cancel-button" bsStyle="default" onClick={this.closeModal}>Cancel</Button>
          </form>

        </Modal>
        
      </div>
    );
  }

}

export default AddEntry;
