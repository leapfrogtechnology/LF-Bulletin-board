import React, { Component } from 'react';
import { SortableHandle } from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <i className="icon ion-drag"></i>);

export default DragHandle;
