import React from 'react';
import PropTypes from 'prop-types';

import * as timeIcon from '../../../public/images/time.png';
import * as dateIcon from '../../../public/images/date.png';
import img from '../../../public/images/bulletin-logo-footer.png';

class BulletinFooter extends React.Component {

  constructor(props) {
    super(props);
    this.timeInterval;
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
      <div
        style={{
          width: '100%',
          bottom: '0',
          zIndex: '10',
          color: '#fff',
          height: '5vh',
          fontSize: '24',
          lineHeight: '50px',
          position: 'absolute',
          backgroundColor: '#000',
          fontFamily: 'Montserrat'
        }}
      >
        <div style={{ float: 'left' }}>
          <span>
            <img
              style={{ padding: '0px 24px 0px 24px' }}
              src={img}
              alt="bulletin logo"
            />
          </span>
          <span>{this.props.title}</span>
        </div>
        <div style={{ float: 'right', padding: '0px 16.5px 0px 16.5px' }}>
          <div style={{ float: 'left' }}>
            <span>
              <img
                style={{ padding: '0px 16.5px 0px 16.5px' }}
                src={timeIcon}
                alt="time icon"
              />
            </span>
            <span>{this.state.date}</span>
          </div>
          <div style={{ float: 'right' }}>
            <span>
              <img
                style={{ padding: '0px 16.5px 0px 16.5px' }}
                src={dateIcon}
                alt="date icon"
              />
            </span>
            <span>{this.state.time}</span>
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
