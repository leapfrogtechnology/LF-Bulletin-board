import {find, isEmpty} from 'lodash';
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
    this.toggleActive = this.toggleActive.bind(this);
  }
  
  componentDidMount () {
    bulletinService.listBulletin().then((response) => {
      this.setState({
        items: (response && response.data && response.data.data) || []
      });
    }).catch((err) => {
      let errorMsg = find([err], "response.data.error.message");
      if(!!errorMsg) {
        swal(errorMsg.response.data.error.message);
      } else {
        swal("Server Error");
      }
    });
    
  }

  refreshList () {
    bulletinService.listBulletin().then((response) => {
      this.setState({
        items: (response && response.data && response.data.data) || []
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
    swal({
      title: textConstants.deleteWarningMessage,
      text: textConstants.deleteWarningDescription,
      type: 'warning',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          bulletinService.deleteBulletin(id).then(() => {
            this.refreshList();
          });
        }
      }).catch((err) => {
        swal(err.response.data.error.message);
      });
  }

  toggleActive (id) {
    let tempList = this.state.items;
    let toggleItem = find(tempList, (item) => item.id === id) || {};
    if(!isEmpty(toggleItem)) {

      toggleItem.activeStatus = !toggleItem.activeStatus;
      let data = {
        title: toggleItem.title,
        owner: toggleItem.owner,
        priority: toggleItem.priority,
        duration: toggleItem.duration,
        activeStatus: toggleItem.activeStatus,
        url: toggleItem.url
      };

      bulletinService.editBulletin(id, data).then((response) => {
        if (response.status === textConstants.httpCodeOk) { 
          this.setState({
            items: tempList
          });      
        }
      });
    }

  }

  render () {
    return (
      <div>
        <div className="clearfix dashboard-header-wrapper">
          <div className="left-content bulletin-heading"><h3>Bulletins</h3></div>
          <div className="right-content">
            <AddEntry refreshList={() => this.refreshList()}/>
          </div>
        </div>
        <div className="bulletin-table">
          <div className="table-head">
            <div className="bulletin-drag-handle"></div>
            <div className="bulletin-title">TITLE</div>
            <div className="bulletin-owner">OWNER</div>              
            <div className="bulletin-duration">DURATION</div>
            <div className="bulletin-url">URL</div>
            <div className="bulletin-toggle"></div>
            <div className="bulletin-actions">ACTIONS</div>
          </div>
          <SortableList helperClass={'SortableHelperWithOverride'} items={this.state.items} onSortEnd={this.onSortEnd}  useDragHandle={true} 
            deleteBulletin={this.deleteBulletin}
            refreshList={this.refreshList}
            toggleActive={this.toggleActive}/>              
        </div>
      </div>
    );
  }

}

export default ListEntries;
