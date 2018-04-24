import swal from 'sweetalert';
import React, { Component } from 'react';
import { arrayMove } from 'react-sortable-hoc';

import AddEntry from '../addEntry';
import SortableList from './SortableList';
import * as bulletinService from '../../services/bulletinService';
import textConstants from '../../constants/textConstants';

class ListEntries extends Component {

  constructor () {
    super();
    
    this.state = {
      items: []
    };
    this.onSortEnd = this.onSortEnd.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.deleteBulletin = this.deleteBulletin.bind(this);
  }
  
  componentDidMount () {
    bulletinService.listBulletin().then((response) => {
      this.setState({
        items: response && response.data && response.data.data || []
      });
    }).catch((err) => {
      swal(err.response.data.error.message);
    });
    
  }

  refreshList () {
    bulletinService.listBulletin().then((response) => {
      this.setState({
        items: response && response.data && response.data.data || []
      });
    }).catch((err) => {
      swal(err.response.data.error.message);
    });
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  }

  deleteBulletin (id) {
    var vm = this;
    swal({
      title: textConstants.deleteWarningMessage,
      text: textConstants.deleteWarningDescription,
      type: 'warning',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then(function (willDelete) {
        if (willDelete) {
          bulletinService.deleteBulletin(id).then(() => {
            vm.refreshList();
          });
        }
      }).catch((err) => {
        swal(err.response.data.error.message);
      });
  }

  render () {
    return (
      <div>
        <div className="clearfix">
          <div className="left-content bulletin-title"><h3>Bulletins</h3></div>
          <div className="right-content">
            <AddEntry refreshList={() => this.refreshList()}/>
          </div>
        </div>
        <div className="bulletin-table">
          <div className="table-head">
            <div className="bulletin-drag-handle"></div>
            <div className="bulletin-id">ID</div>
            <div className="bulletin-title">TITLE</div>
            <div className="bulletin-owner">OWNER</div>              
            <div className="bulletin-duration">DURATION</div>
            <div className="bulletin-url">URL</div>
            <div className="bulletin-actions">ACTIONS</div>
          </div>
          <SortableList helperClass={'SortableHelperWithOverride'} items={this.state.items} onSortEnd={this.onSortEnd}  useDragHandle={true} 
            deleteBulletin={this.deleteBulletin}
            refreshList={this.refreshList}/>              
        </div>
      </div>
    );
  }

}

export default ListEntries;
