import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <i className="icon ion-md-reorder"></i>);

export default DragHandle;
