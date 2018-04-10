import React, { Component } from 'react';

class BulletinScreen extends Component {

  constructor() {
    super();
    this.state = {
      dataCollection: [],
      newDataCollection: [],
      choosenDuration: 1000,
      firstSelectedLink: {},
      secondSelectedLink: {}
    };

    this.getDate = this.getData.bind(this);
    this.setData = this.setData.bind(this);
    this.showFrame = this.showFrame.bind(this);
    this.toggleFrame = this.toggleFrame.bind(this);
    this.checkNewLink = this.checkNewLink.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.changeSelectedLink = this.changeSelectedLink.bind(this);
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

      index == 0 ? await this.checkNewLink() : null;

      this.setState(
        {
          firstSelectedLink: {
            ...this.state.firstSelectedLink,
            url: this.state.dataCollection[index].url,
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

      index == 0 ? await this.checkNewLink() : null;

      this.setState(
        {
          secondSelectedLink: {
            ...this.state.secondSelectedLink,
            url: this.state.dataCollection[index].url,
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

  componentDidMount() {
    this.getData();
  }

  componentWillMount() {
    let tempObjects = [
      {
        url: 'https://weather.lftechnology.com/',
        duration: 1000
      },
      {
        url: 'https://sports.lftechnology.com/',
        duration: 1000
      },
      {
        url: 'https://dev.music.lftechnology.com/',
        duration: 1000
      },
      {
        url: 'https://sports.lftechnology.com/',
        duration: 1000
      }
    ];
    localStorage.setItem('data', JSON.stringify(tempObjects));
  }

  getData() {
    const index = 0;
    const linksCollection = JSON.parse(localStorage.getItem('data'));

    this.setData(index, linksCollection);
  }

  setData(index, linksCollection) {
    this.setState({ dataCollection: linksCollection }, () => {
      if (this.state.dataCollection.length === 0) {
        // logic still left to be handled
      } else if (this.state.dataCollection.length === 1) {
        // logic still left to be handled
      } else {
        this.setState(
          {
            firstSelectedLink: {
              url: this.state.dataCollection[0].url,
              duration: this.state.dataCollection[0].duration,
              index: index,
              show: true
            },
            secondSelectedLink: {
              url: this.state.dataCollection[1].url,
              duration: this.state.dataCollection[1].duration,
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
    setTimeout(() => this.toggleFrame(), this.state.choosenDuration);
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
        this.changeDuration();
      }
    );
  }

  render() {
    return (
      <div style={{ height: '100vh' }}>
        <iframe
          src={this.state.firstSelectedLink.url}
          width="100%"
          height="100%"
          scrolling="no"
          style={{
            position: 'fixed',
            border: 0,
            visibility: this.state.firstSelectedLink.show ? 'visible' : 'hidden'
          }}
        />
        <iframe
          src={this.state.secondSelectedLink.url}
          width="100%"
          height="100%"
          scrolling="no"
          style={{
            position: 'absolute',
            border: 0,
            visibility: this.state.secondSelectedLink.show
              ? 'visible'
              : 'hidden'
          }}
        />
      </div>
    );
  }

}

export default BulletinScreen;
