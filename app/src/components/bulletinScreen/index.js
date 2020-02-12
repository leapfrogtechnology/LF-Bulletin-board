import swal from 'sweetalert';
import io from 'socket.io-client';
import React, { Component } from 'react';
import { cloneDeep } from 'lodash';

import regex from '../../constants/regex';
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
      startSecondSlide: false,
      choosenDuration: textConstants.DEFAULT_SLIDE_DURATION,
      activeBulletinTitle: 'Leapfrog Bulletin',
      firstSelectedLink: {},
      secondSelectedLink: {}
    };

    this.newDataCollection = [];
    this.isnewDataCollection = false;

    this.socket = io.connect(urlConstants.baseUrl);

    this.socket.on('IS_LIST_UPDATED', data => {
      if (data.status) {
        this.getNewCollection();
      }
    });

    this.getLink = this.getLink.bind(this);
    this.setData = this.setData.bind(this);
    this.showFrame = this.showFrame.bind(this);
    this.toggleFrame = this.toggleFrame.bind(this);
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
      this.setState({ choosenDuration: this.state.firstSelectedLink.duration }, () => {
        this.changeSelectedLink();
      });
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

  changeSelectedLink() {
    let index;
    let newCollectionFlag = false;

    if (!this.state.firstSelectedLink.show) {
      index = (this.state.firstSelectedLink.index + 2) % this.state.dataCollection.length;

      newCollectionFlag = index === 0 && this.isnewDataCollection;

      if (newCollectionFlag) {
        this.setData(cloneDeep(this.newDataCollection));

        this.newDataCollection = [];
        this.isnewDataCollection = false;

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
      index = (this.state.secondSelectedLink.index + 2) % this.state.dataCollection.length;

      newCollectionFlag = index === 0 && this.isnewDataCollection;

      if (newCollectionFlag) {
        this.setData(cloneDeep(this.newDataCollection));

        this.newDataCollection = [];
        this.isnewDataCollection = false;

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

  getNewCollection() {
    let newList;

    bulletinService.listBulletin().then(response => {
      newList = bulletinService.filterActiveList(response.data.data);
      this.newDataCollection = newList;
      this.isnewDataCollection = true;

      // call the setData() function immediately only if currently active datacollection list is empty or has only one item
      if (this.state.dataCollection.length === 0 || this.state.dataCollection.length === 1) {
        this.setData(cloneDeep(this.newDataCollection));
        this.newDataCollection = [];
        this.isnewDataCollection = false;
      }
    });
  }

  fetchBulletinList() {
    let newList;

    bulletinService
      .listBulletin()
      .then(response => {
        newList = bulletinService.filterActiveList(response.data.data);

        this.setData(newList);
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error.message) {
          swal(err.response.data.error.message);
        } else {
          swal('Server Error');
        }
      });
  }

  setData(linksCollection) {
    this.setState({ dataCollection: linksCollection }, () => {
      if (this.state.dataCollection.length === 0) {
        bulletinService.addIframeBackgroundImage();

        this.setState({
          firstSelectedLink: dummyBulletinSegment,
          secondSelectedLink: dummyBulletinSegment,
          choosenDuration: 0,
          activeBulletinTitle: 'Leapfrog Bulletin'
        });
      } else if (this.state.dataCollection.length === 1) {
        bulletinService.removeIframeBackgroundImage();

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
        bulletinService.removeIframeBackgroundImage();

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
    /**
     *
     * As we have got two iframes in bulletin board, both iframes were autoplaying.
     * By this fix and getLink function only one iframe is autoplaying and other iframe stops from autoplay.
     * But when changing the link in iframe or simply changing parameters in iframe the iframe auto reloads
     * and refetches the data from network.
     *
     * This fix of -3s in duration calls toogle frame before 3 sec of original duration ended and changes the
     * link/autoplays the second iframe also.
     * In which on 3sec network is resolved and new slides data are fetched properly.
     *
     */
    setTimeout(() => this.toggleFrame(), (this.state.choosenDuration - 3) * 1000);
  }

  toggleFrame() {
    // Autoplays second slide before first has sended
    this.setState({ startSecondSlide: true }, () => {
      setTimeout(() => {
        this.setState(
          {
            startSecondSlide: false,
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
              activeBulletinTitle: this.state.secondSelectedLink.show
                ? this.state.secondSelectedLink.title
                : this.state.firstSelectedLink.title
            });
            this.changeDuration();
          }
        );
      }, 3000);
    });
  }

  /**
   * Get link based on visibility.
   *
   * @param {*} link
   * @param {*} visibility
   *
   * @returns
   * @memberof BulletinScreen
   */
  getLink(link, visibility) {
    if (link) {
      if (visibility || this.state.startSecondSlide) {
        if (link.search('docs.google.com') > -1) {
          if (link.includes('start=false')) {
            link = link.replace('start=false', 'start=true');
          }
        } else if (link.match(regex.YOUTUBE_REGEX) !== null) {
          if (link.includes('autoplay=0')) {
            link = link.replace('autoplay=0', 'autoplay=1');
          }
          if (link.includes('mute=0')) {
            link = link.replace('mute=0', 'mute=1');
          }
        }
      } else {
        link = '';
      }
    }

    return link;
  }

  render() {
    return (
      <div>
        <div className="iframe-holder">
          <iframe
            title="first frame"
            src={this.getLink(this.state.firstSelectedLink.url, this.state.firstSelectedLink.show)}
            className="first-iframe"
            style={{
              visibility: this.state.firstSelectedLink.show ? 'visible' : 'hidden'
            }}
          />
          <iframe
            title="second frame"
            src={this.getLink(this.state.secondSelectedLink.url, this.state.secondSelectedLink.show)}
            className="second-iframe"
            style={{
              visibility: this.state.secondSelectedLink.show ? 'visible' : 'hidden'
            }}
          />
        </div>
        <BulletinFooter title={this.state.activeBulletinTitle} />
      </div>
    );
  }
}

export default BulletinScreen;
