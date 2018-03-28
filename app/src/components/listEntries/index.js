import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import * as bulletinService from '../../services/bulletinService';
import {arrayMove, SortableElement, SortableContainer, SortableHandle} from 'react-sortable-hoc';

import AddEntry from '../addEntry';

const DragHandle = SortableHandle(() => <FontAwesome
name="bars"
size="1x"
style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
/>);

const SortableItem = SortableElement(({item, deleteBulletin}) => {
  return (
    <div className="table-row">
      <div className="bulletin-drag-handle"><DragHandle/></div>
      <div className="bulletin-id">{item.id}</div>
      <div className="bulletin-title">{item.title}</div>
      <div className="bulletin-owner">{item.owner}</div>
      <div className="bulletin-duration">{item.duration}</div>
      <div className="bulletin-url"><a href={item.url}>{item.url}</a></div>
      <div className="bulletin-actions">
        <FontAwesome
          className="edit-icon"
          name="pencil"
          size="1x"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
        />
        <FontAwesome
          className="cancel-icon"
          name="trash"
          size="1x"
          style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
          onClick={() => {deleteBulletin(item.id)}}
        />
      </div>
    </div>
  );
});

const SortableList = SortableContainer(({items, deleteBulletin}) => {
  return (
    <div className="table-body">
      {items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} deleteBulletin={deleteBulletin}/>
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
    bulletinService.deleteBulletin(id).then((response) => {
      this.refreshList();
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
          <SortableList items={this.state.items} onSortEnd={this.onSortEnd}  useDragHandle={true} deleteBulletin={this.deleteBulletin}/>              
        </div>
      </div>
    );
  }

}

export default ListEntries;
