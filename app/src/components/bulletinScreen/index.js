import swal from 'sweetalert';
import io from 'socket.io-client';
import React, { Component } from 'react';

import BulletinFooter from '../bulletinFooter';
import urlConstants from '../../constants/urlConstants';
import textConstants from '../../constants/textConstants';
import * as bulletinService from '../../services/bulletinService';

import './styles.css';

const dummyBulletinSegment = {
  url: '',
  duration: 0,
  title: '',
  index: 0,
  show: false
};

class BulletinScreen extends Component {

  constructor() {
    super();
    this.state = {
      dataCollection: [],
      choosenDuration: textConstants.DEFAULT_SLIDE_DURATION,
      activeBulletinTitle: 'Leapfrog Bulletin',
      firstSelectedLink: {},
      secondSelectedLink: {}
    };

    this.newDataCollection = [];
    
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

  componentDidMount() {
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
    let newCollectionFlag = false;
    if (!this.state.firstSelectedLink.show) {
      index =
        (this.state.firstSelectedLink.index + 2) %
        this.state.dataCollection.length;

      newCollectionFlag = index === 0 && this.checkNewLink();
      
      if(newCollectionFlag) {
        this.setData(this.newDataCollection);
        this.newDataCollection = [];
        return;
      }
      
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
      
      newCollectionFlag = index === 0 && this.checkNewLink();
      
      if(newCollectionFlag) {
        this.setData(this.newDataCollection);
        this.newDataCollection = [];
        return;
      }

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
    return this.newDataCollection.length ? true: false;  
  }

  getNewCollection() {
    let newList;

    bulletinService.listBulletin()
      .then((response) => {
        newList = bulletinService.filterActiveList(response.data.data);

        this.newDataCollection = newList;
        
        //if currently active datacollection list has only one item, call the setData() function now
        if(this.state.dataCollection.length === 0 || this.state.dataCollection.length === 1) {
          this.setData(this.newDataCollection);
        }
      });
  }

  fetchBulletinList() {
    let newList;

    bulletinService.listBulletin()
      .then((response) => {
        newList = bulletinService.filterActiveList(response.data.data);

        this.setData(newList);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error.message) {
          swal(err.response.data.error.message);
        } else {
          swal("Server Error");
        }
      });
  }

  setData(linksCollection) {
    this.setState({ dataCollection: linksCollection }, () => {
      if (this.state.dataCollection.length === 0) {
        this.setState({
          firstSelectedLink: dummyBulletinSegment,
          secondSelectedLink: dummyBulletinSegment,
          choosenDuration: 0,
          activeBulletinTitle: 'Leapfrog Bulletin'
        });
      } else if (this.state.dataCollection.length === 1) {
        this.setState({
          firstSelectedLink: {
            url: this.state.dataCollection[0].url,
            duration: this.state.dataCollection[0].duration,
            title: this.state.dataCollection[0].title,
            index: 0,
            show: true
          },
          secondSelectedLink: dummyBulletinSegment,
          choosenDuration: this.state.dataCollection[0].duration,
          activeBulletinTitle: this.state.dataCollection[0].title
        });
      } else {
        this.setState(
          {
            firstSelectedLink: {
              url: this.state.dataCollection[0].url,
              duration: this.state.dataCollection[0].duration,
              title: this.state.dataCollection[0].title,
              index: 0,
              show: true
            },
            secondSelectedLink: {
              url: this.state.dataCollection[1].url,
              duration: this.state.dataCollection[1].duration,
              title: this.state.dataCollection[1].title,
              index: 1,
              show: false
            },
            choosenDuration: this.state.dataCollection[0].duration,
            activeBulletinTitle: this.state.dataCollection[0].title
          },

          () => {
            this.showFrame();
          }
        );
      }
    });
  }

  showFrame() {
    setTimeout(() => this.toggleFrame(), this.state.choosenDuration * 1000);
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
          activeBulletinTitle: this.state.secondSelectedLink.show ? this.state.secondSelectedLink.title : this.state.firstSelectedLink.title
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
            title="first frame"
            src={this.state.firstSelectedLink.url}
            className="first-iframe"
            style={{
              visibility: this.state.firstSelectedLink.show ? 'visible' : 'hidden'
            }}
          />
          <iframe
            title="second frame"
            src={this.state.secondSelectedLink.url}
            className="second-iframe"
            style={{
              visibility: this.state.secondSelectedLink.show
                ? 'visible'
                : 'hidden'
            }}
          />
        </div>
        <BulletinFooter title={this.state.activeBulletinTitle} />
      </div>

    );
  }

}

export default BulletinScreen;
