import swal from 'sweetalert';
import io from 'socket.io-client';
import React, { Component } from 'react';

import BulletinFooter from '../bulletinFooter';
import urlConstants from '../../constants/urlConstants';
import textConstants from '../../constants/textConstants';
import * as bulletinService from '../../services/bulletinService';

import './styles.css';
class BulletinScreen extends Component {

  constructor() {
    super();
    this.state = {
      dataCollection: [],
      newDataCollection: [],
      choosenDuration: textConstants.defaultSlideDuration,
      activeBulletinTitle: 'Leapfrog Bulletin',
      firstSelectedLink: {},
      secondSelectedLink: {}
    };

    this.socket = io.connect(urlConstants.baseUrl);
    
    this.socket.on('IS_LIST_UPDATED', (data) => {
      if (data.status) {
        this.getNewCollection();
      }
    });

    this.setData = this.setData.bind(this);
    this.showFrame = this.showFrame.bind(this);
    this.toggleFrame = this.toggleFrame.bind(this);
    this.checkNewLink = this.checkNewLink.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.getNewCollection = this.getNewCollection.bind(this);
    this.fetchBulletinList = this.fetchBulletinList.bind(this);
    this.changeSelectedLink = this.changeSelectedLink.bind(this);
  }

  componentDidMount () {
    this.fetchBulletinList();
  }

  changeDuration() {
    if (this.state.firstSelectedLink.show) {
      this.setState(
        { choosenDuration: this.state.firstSelectedLink.duration },
        () => {
          this.changeSelectedLink();
        }
      );
    } else {
      this.setState(
        {
          choosenDuration: this.state.secondSelectedLink.duration
        },
        () => {
          this.changeSelectedLink();
        }
      );
    }
  }

  async changeSelectedLink() {
    let index;

    if (!this.state.firstSelectedLink.show) {
      index =
        (this.state.firstSelectedLink.index + 2) %
        this.state.dataCollection.length;

      index == 0 ||  await this.checkNewLink();

      this.setState(
        {
          firstSelectedLink: {
            ...this.state.firstSelectedLink,
            url: this.state.dataCollection[index].url,
            title: this.state.dataCollection[index].title,
            duration: this.state.dataCollection[index].duration,
            index: index
          }
        },
        () => {
          this.showFrame();
        }
      );
    } else if (!this.state.secondSelectedLink.show) {
      index =
        (this.state.secondSelectedLink.index + 2) %
        this.state.dataCollection.length;

      index == 0 || await this.checkNewLink();

      this.setState(
        {
          secondSelectedLink: {
            ...this.state.secondSelectedLink,
            url: this.state.dataCollection[index].url,
            title: this.state.dataCollection[index].title,
            duration: this.state.dataCollection[index].duration,
            index: index
          }
        },
        () => {
          this.showFrame();
        }
      );
    }
  }

  checkNewLink() {
    if (this.state.newDataCollection.length) {
      this.setState(
        {
          dataCollection: this.state.newDataCollection
        },
        () => {
          this.setState({ newDataCollection: [] });
        }
      );
    }
  }

  getNewCollection() {
    bulletinService.listBulletin()
      .then((response) => {
        this.setState({
          newDataCollection: response.data.data
        });
      });
  }

  fetchBulletinList () {
    bulletinService.listBulletin()
      .then((response) => {
        const {data} = response.data;
        
        this.setData(0, data);
      })
      .catch((err) => {
        swal(err.response.data.error.message);
      });
  }

  setData(index, linksCollection) {
    this.setState({ dataCollection: linksCollection }, () => {
      if (this.state.dataCollection.length === 0) {
        // [TODO] logic still left to be handled
      } else if (this.state.dataCollection.length === 1) {
        // [TODO] logic still left to be handled
        console.error("TODO: Only one link still to handled");
      } else {
        this.setState(
          {
            firstSelectedLink: {
              url: this.state.dataCollection[0].url,
              duration: this.state.dataCollection[0].duration,
              title: this.state.dataCollection[0].title,
              index: index,
              show: true
            },
            secondSelectedLink: {
              url: this.state.dataCollection[1].url,
              duration: this.state.dataCollection[1].duration,
              title: this.state.dataCollection[1].title,
              index: index + 1,
              show: false
            },
            choosenDuration: this.state.dataCollection[index].duration
          },

          () => {
            this.showFrame();
          }
        );
      }
    });
  }

  showFrame() {
    setTimeout(() => this.toggleFrame(), this.state.choosenDuration*1000);
  }

  toggleFrame() {
    this.setState(
      {
        firstSelectedLink: {
          ...this.state.firstSelectedLink,
          show: !this.state.firstSelectedLink.show
        },
        secondSelectedLink: {
          ...this.state.secondSelectedLink,
          show: !this.state.secondSelectedLink.show
        }  
      },
      () => {
        this.setState({
          activeBulletinTitle: this.state.secondSelectedLink.show? this.state.secondSelectedLink.title : this.state.firstSelectedLink.title
        });
        this.changeDuration();
      }
    );
  }

  render() {
    return (
      <div>
        <div className="iframe-holder">
          <iframe
            src={this.state.firstSelectedLink.url}
            className="first-iframe"
            style={{
              visibility: this.state.firstSelectedLink.show ? 'visible' : 'hidden'
            }}
          />
          <iframe
            src={this.state.secondSelectedLink.url}
            className="second-iframe"
            style={{
              visibility: this.state.secondSelectedLink.show
                ? 'visible'
                : 'hidden'
            }}
          />
        </div>
        <BulletinFooter title={this.state.activeBulletinTitle}/>
      </div>

    );
  }

}

export default BulletinScreen;
