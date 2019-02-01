import React from 'react';
import PropTypes from 'prop-types';

import * as timeIcon from '../../assets/images/time.png';
import * as dateIcon from '../../assets/images/date.png';
import * as img from '../../assets/images/bulletin-logo-inverse.png';

class BulletinFooter extends React.Component {

  constructor(props) {
    super(props);
    this.timeInterval = null;

    this.state = {
      date: '',
      time: ''
    };

    this.getDateTime = this.getDateTime.bind(this);
  }

  componentDidMount() {
    this.timeInterval = setInterval(this.getDateTime, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.timeInterval);
  }

  getDateTime() {
    const optionsDate = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    const optionsTime = {
      hour: '2-digit',
      minute: '2-digit'
    };

    const dateTime = new Date();
    const date = dateTime.toLocaleDateString('en-us', optionsDate);
    const time = dateTime.toLocaleTimeString('en-us', optionsTime);

    this.setState({
      date: date,
      time: time
    });
  }

  render() {
    return (
      <div className="footer-wrapper">
        <div className="left-content">
          <span>
            <img
              className="footer-logo"
              src={img}
              alt="bulletin logo"
            />
          </span>
          <span className="footer-text">{this.props.title}</span>
        </div>
        <div className="right-content">
          <div className="left-content">
            <span className="footer-text">
              <i className="footer-icon ion-md-calendar"></i>{this.state.date}
            </span>
          </div>
          <div className="right-content">
            <span className="footer-text">
              <i className="footer-icon ion-md-time"></i>{this.state.time}
            </span>
          </div>
        </div>
      </div>
    );
  }

}

BulletinFooter.propTypes = {
  title: PropTypes.string
};

export default BulletinFooter;
