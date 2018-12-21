import React, { Component } from 'react';

class PageNotFound extends Component {

  render() {
    return (
      <div className="not-found-container">
        <div className="not-found-status">404</div>
        <div className="not-found-message">Page Not Found</div>
      </div>
    );
  }

}

export default PageNotFound;
