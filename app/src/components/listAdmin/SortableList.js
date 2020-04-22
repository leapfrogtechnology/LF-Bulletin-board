import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items, deleteUser, refreshList }) => {
  return (
    <div className="table-body">
      {items &&
        items.map((item, index) => {
          return (
            <SortableItem
              key={`item-${item.id}`}
              index={index}
              item={item}
              deleteUser={deleteUser}
              refreshList={refreshList}
            />
          );
        })}
    </div>
  );
});

export default SortableList;
