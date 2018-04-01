import swal from 'sweetalert';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import * as bulletinService from '../../services/bulletinService';
import {arrayMove, SortableElement, SortableContainer, SortableHandle} from 'react-sortable-hoc';

import AddEntry from '../addEntry';
import EditEntry from '../editEntry';

const DragHandle = SortableHandle(() => <i className="icon ion-drag"></i>);

const SortableItem = SortableElement(({item, deleteBulletin, refreshList}) => {
  return (
    <div className="table-row">
      <div className="bulletin-drag-handle"><DragHandle/></div>
      <div className="bulletin-id">{item.id}</div>
      <div className="bulletin-title">{item.title}</div>
      <div className="bulletin-owner">{item.owner}</div>
      <div className="bulletin-duration">{item.duration}</div>
      <div className="bulletin-url"><a href={item.url}>{item.url}</a></div>
      <div className="bulletin-actions">
        <EditEntry item={item} refreshList={refreshList}/>
        <i className="icon ion-trash-b"
          onClick={() => {deleteBulletin(item.id)}}
        ></i>
      </div>
    </div>
  );
});

const SortableList = SortableContainer(({items, deleteBulletin, refreshList}) => {
  return (
    <div className="table-body">
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} deleteBulletin={deleteBulletin}
          refreshList={refreshList}
        />
      ))}
    </div>
  );
});

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
      items: response.data.data
    });
   });
    
  }

  refreshList () {
    bulletinService.listBulletin().then((response) => {
      this.setState({
        items: response.data.data
      });
     });
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  }

  deleteBulletin (id) {
    swal({
      title: "Are you sure?",
      text: "You will be deleting this bulletin segment! ",
      type: "warning",
      icon: "warning",
      buttons: true,
      dangerMode: true
    })
    .then(function (willDelete) {
      if (willDelete) {
        bulletinService.deleteBulletin(id).then((response) => {
          this.refreshList();
        });
      }
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
          <SortableList items={this.state.items} onSortEnd={this.onSortEnd}  useDragHandle={true} 
          deleteBulletin={this.deleteBulletin}
          refreshList={this.refreshList}/>              
        </div>
      </div>
    );
  }

}

export default ListEntries;
