import swal from 'sweetalert';
import { orderBy } from 'lodash';
import React, { Component } from 'react';

import AddAdmin from '../addAdmin';

import SortableList from './SortableList';

import { getErrorMessage } from '../../utils/utils';

import * as userService from '../../services/userService';

import textConstants from '../../constants/textConstants';

class ListAdmin extends Component {
  constructor() {
    super();

    this.state = {
      items: []
    };

    this.refreshList = this.refreshList.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    userService
      .listAllUsers()
      .then((response) => {
        this.setState({
          items: (response && response.data && response.data.data && orderBy(response.data.data, 'email', 'asc')) || []
        });
      })
      .catch((err) => swal(getErrorMessage(err)));
  }

  refreshList() {
    userService
      .listAllUsers()
      .then((response) => {
        this.setState({
          items: (response && response.data && response.data.data && orderBy(response.data.data, 'email', 'asc')) || []
        });
      })
      .catch((err) => swal(getErrorMessage(err)));
  }

  deleteUser(id) {
    swal({
      title: textConstants.DELETE_WARNING_MESSAGE,
      text: textConstants.DELETE_USER_WARNING_DESCRIPTION,
      type: 'warning',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          userService.deleteUser(id).then(() => {
            this.refreshList();
          });
        }
      })
      .catch((err) => swal(getErrorMessage(err)));
  }

  render() {
    return (
      <div>
        <div className="clearfix dashboard-header-wrapper">
          <div className="left-content bulletin-heading">
            <h3>Users</h3>
          </div>
          <div className="right-content">
            <AddAdmin refreshList={() => this.refreshList()} />
          </div>
        </div>
        <div className="bulletin-table">
          <div className="table-head">
            <div className="bulletin-email">Email</div>
            <div className="bulletin-user-type">Type</div>
            <div className="bulletin-actions">ACTIONS</div>
          </div>
          <SortableList
            helperClass={'SortableHelperWithOverride'}
            items={this.state.items}
            useDragHandle={true}
            deleteUser={this.deleteUser}
            refreshList={this.refreshList}
            toggleActive={this.toggleActive}
          />
        </div>
      </div>
    );
  }
}

export default ListAdmin;
