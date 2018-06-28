import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from './SortableItem';

const SortableList = SortableContainer(({items, deleteBulletin, refreshList}) => {
  return (
    <div className="table-body">
      {items && items.map((item, index) => (
        <SortableItem key={`item-${index}`} index={index} item={item} deleteBulletin={deleteBulletin}
          refreshList={refreshList}
        />
      ))}
    </div>
  );
});

export default SortableList;
