import './styles.css';

import swal from 'sweetalert';
import React, { Component } from 'react';
import { cloneDeep, isEqual } from 'lodash';

import textConstants from '../../constants/textConstants';

import BulletinFooter from '../bulletinFooter';

import * as bulletinUtil from '../../utils/bulletinUtil';
import { getErrorMessage, getLink, getBulletinFetchInterval } from '../../utils/utils';

import * as bulletinService from '../../services/bulletinService';

class BulletinScreen extends Component {
  constructor() {
    super();
    this.state = {
      dataCollection: [],
      startHiddenSlide: false,
      chosenDuration: textConstants.DEFAULT_SLIDE_DURATION,
      activeBulletinTitle: textConstants.DEFAULT_BULLETIN_TITLE,
      firstSelectedLink: {},
      secondSelectedLink: {}
    };

    this.newDataCollection = [];
    this.isnewDataCollection = false;
    this.newCollectionIntervalKey = null;

    this.setData = this.setData.bind(this);
    this.showFrame = this.showFrame.bind(this);
    this.toggleFrame = this.toggleFrame.bind(this);
    this.getNewCollection = this.getNewCollection.bind(this);
    this.fetchBulletinList = this.fetchBulletinList.bind(this);
    this.changeSelectedLink = this.changeSelectedLink.bind(this);
  }

  componentDidMount() {
    this.fetchBulletinList();

    this.newCollectionIntervalKey = setInterval(this.getNewCollection, getBulletinFetchInterval());
  }

  componentWillUnmount() {
    clearInterval(this.newCollectionIntervalKey);
  }

  /**
   * Filter and Set Iframe Data based on Number Of Bulletin List.
   *
   * @param {*} [bulletinList=[]]
   * @memberof BulletinScreen
   */
  setData(bulletinList = []) {
    const selectedData = bulletinUtil.getBulletinList(bulletinList);

    if (bulletinList.length === 0 || bulletinList.length === 1) {
      this.setState({ ...selectedData });
    } else {
      this.setState({ ...selectedData }, this.showFrame);
    }
  }

  fetchBulletinList() {
    bulletinService
      .listBulletin()
      .then(response => {
        const bulletinList = bulletinService.filterActiveList(response.data.data);

        this.setData(bulletinList);
      })
      .catch(err => swal(getErrorMessage(err)));
  }

  getNewCollection() {
    bulletinService.listBulletin().then(response => {
      const bulletinList = bulletinService.filterActiveList(response.data.data);
      const isBulletinListUpdated = !isEqual(bulletinList, this.state.dataCollection);

      // Check if Bulletin List is Updated Otherwise Don't Update the state.
      if (isBulletinListUpdated) {
        // Call the setData() function immediately only if currently active dataCollection list is empty or has only one item
        if (this.state.dataCollection.length === 0 || this.state.dataCollection.length === 1) {
          this.setData(cloneDeep(bulletinList));
          this.newDataCollection = [];
          this.isnewDataCollection = false;
        } else {
          this.newDataCollection = bulletinList;
          this.isnewDataCollection = true;
        }
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
    const waitTime = this.state.chosenDuration - 3 > 0 ? this.state.chosenDuration - 3 : 0;

    setTimeout(() => {
      this.setState({ startHiddenSlide: true }, this.toggleFrame);
    }, waitTime * 1000);
  }

  /**
   * Toggle Which Frame To show now between First and Second One.
   *
   * @memberof BulletinScreen
   */
  toggleFrame() {
    // Set Timeout 3000ms is used as in showFrame() 3000ms is reduced when showing second iFrame.
    setTimeout(() => {
      const { firstSelectedLink, secondSelectedLink } = this.state;
      const showFirstSelectedLink = !firstSelectedLink.show;

      const toggledData = {
        startHiddenSlide: false,
        activeBulletinTitle: showFirstSelectedLink ? firstSelectedLink.title : secondSelectedLink.title,
        chosenDuration: showFirstSelectedLink ? firstSelectedLink.duration : secondSelectedLink.duration,
        firstSelectedLink: {
          ...firstSelectedLink,
          show: showFirstSelectedLink
        },
        secondSelectedLink: {
          ...secondSelectedLink,
          show: !secondSelectedLink.show
        }
      };

      this.setState({ ...toggledData }, this.changeSelectedLink);
    }, 3000);
  }

  /**
   * It Updates the state if New Bulletin Data is available and it switches between 1st,2nd 3rd .... Bulletins.
   *
   * @memberof BulletinScreen
   */
  changeSelectedLink() {
    const { firstSelectedLink, secondSelectedLink } = this.state;

    const firstSelectedLinkShowing = !firstSelectedLink.show;
    const secondSelectedLinkShowing = !secondSelectedLink.show;

    // The condition is false when there are no bulletins.
    if (firstSelectedLinkShowing !== secondSelectedLinkShowing) {
      const currentSelected = firstSelectedLinkShowing ? firstSelectedLink : secondSelectedLink;

      const index = (currentSelected.index + 2) % this.state.dataCollection.length;
      const newCollectionFlag = index === 0 && this.isnewDataCollection;

      if (newCollectionFlag) {
        this.setData(cloneDeep(this.newDataCollection));

        this.newDataCollection = [];
        this.isnewDataCollection = false;

        return;
      }

      const updatedData = firstSelectedLinkShowing
        ? {
            firstSelectedLink: {
              ...this.state.firstSelectedLink,
              url: this.state.dataCollection[index].url,
              title: this.state.dataCollection[index].title,
              duration: this.state.dataCollection[index].duration,
              index: index
            }
          }
        : {
            secondSelectedLink: {
              ...this.state.secondSelectedLink,
              url: this.state.dataCollection[index].url,
              title: this.state.dataCollection[index].title,
              duration: this.state.dataCollection[index].duration,
              index: index
            }
          };

      this.setState({ ...updatedData }, this.showFrame);
    }
  }

  render() {
    const { firstSelectedLink, secondSelectedLink } = this.state;

    return (
      <div>
        <div className="iframe-holder">
          <iframe
            title="first frame"
            src={getLink(firstSelectedLink.url, firstSelectedLink.show, this.state.startHiddenSlide)}
            className="first-iframe"
            style={{
              visibility: firstSelectedLink.show ? 'visible' : 'hidden'
            }}
          />
          <iframe
            title="second frame"
            src={getLink(secondSelectedLink.url, secondSelectedLink.show, this.state.startHiddenSlide)}
            className="second-iframe"
            style={{
              visibility: secondSelectedLink.show ? 'visible' : 'hidden'
            }}
          />
        </div>
        <BulletinFooter title={this.state.activeBulletinTitle} />
      </div>
    );
  }
}

export default BulletinScreen;
