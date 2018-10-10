import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

import DragHandle from './DragHandle';
import EditEntry from '../editEntry';

const SortableItem = SortableElement(({item, deleteBulletin, refreshList}) => {
  return (
    <div className="table-row">
      <div className="bulletin-drag-handle"><DragHandle/></div>
      <div className="bulletin-id">{item.id}</div>
      <div className="bulletin-title">{item.title}</div>
      <div className="bulletin-owner">{item.owner}</div>
      <div className="bulletin-duration">{item.duration}</div>
      <div className="bulletin-url"><a href={item.url}><span>{item.url}</span></a></div>
      <div className="bulletin-actions">
        <EditEntry item={item} refreshList={refreshList}/>
        <i className="icon ion-trash-b"
          onClick={() => deleteBulletin(item.id)}
        ></i>
      </div>
    </div>
  );
});

export default SortableItem;
