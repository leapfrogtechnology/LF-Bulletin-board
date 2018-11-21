import React, { Component, PropTypes } from 'react';

class GithubButtons extends Component {

  render() {
    let { user, repo } = this.props;
    let starUrl = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=star&count=true&size=large`;
    let forkUrl = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=fork&count=true&size=large`;

    return (
      <div className="github-buttons-wrapper">
        <iframe
          src={starUrl}
          width="130px"
          height="30px"
          scrolling="0"
          frameBorder="0"
        >
        </iframe>
        <iframe
          src={forkUrl}
          width="130px"
          height="30px"
          scrolling="0"
          frameBorder="0"
        >
        </iframe>
      </div>
    );
  }

}

GithubButtons.propTypes = {
  user: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired
};

export default GithubButtons;
