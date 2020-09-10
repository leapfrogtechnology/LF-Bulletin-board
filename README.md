<div align="center">
  <a href="https://github.com/leapfrogtechnology/bulletin-board">
    <img width="128px" src="app/src/assets/images/bulletin-board-login-image.png"/> 
    <img width="128px" style="padding-left:20px" src="assets/logo_leapfrog.svg"/>
  </a>
  <br/>

# bulletin-board

[![License](https://img.shields.io/github/license/leapfrogtechnology/bulletin-board.svg?style=flat-square)](LICENSE.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

</div>

Leapfrog Bulletin Board is a web application created with Node.js(express) as backend and React.js as frontend.

The Bulletin Board acts as a platform for sharing useful information regarding ongoing activities at Company/Organization to its employees through different informative segments. Information can be in form of Google slides, videos, images, website and YouTube.

## Setup

### Clone the repository

```bash
# Clone with SSH
$ git clone git@github.com:leapfrogtechnology/bulletin-board.git

# Or with HTTPS
$ git clone https://github.com/leapfrogtechnology/bulletin-board.git
```

#### Install dependencies (Root folder also requires package installation for proper functionality)

```bash
# Using npm
$ npm install

# Or using yarn
$ yarn
```

## For API

Read our [installation guide for API](api/README.md) for the development guide.

## For APP

Read our [installation guide for APP](app/README.md) for the development guide.

## Google API Credentials

Goto [Google oAuth Console](https://console.cloud.google.com/apis/credentials/oauthclient) and create new oAuth Credential with Application type as **Web application** and authorized domain as following:

```
http://localhost
http://localhost:3000
http://0.0.0.0:8848
```

**Note:** Need to Update the domain when in production.

#### Update Credential in API

```
# Google CLIENT ID
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
```

#### Update in APP

```
# Google Client ID KEY
REACT_APP_GOOGLE_CLIENT_ID=
```

## Generate Changelog

Generate Changelog Only with following command:

```bash
$ NEXT=APP_NEXT_VERSION TOKEN=YOUR_GITHUB_TOKEN yarn changelog

E.g:
$ NEXT=v4.0.1 TOKEN=4545c0557b37331454343434 yarn changelog
```

## Release

Generate changelog and publish a new tag using the following command:

```bash
$ NEXT=APP_NEXT_VERSION TOKEN=YOUR_GITHUB_TOKEN yarn release

E.g:
$ NEXT=v4.0.1 TOKEN=4545c0557b37331454343434 yarn release
```

**Note**: This requires [`github_changelog_generator`](https://github.com/github-changelog-generator/github-changelog-generator) to be installed.

Don't have github token, generate one here: [`generate_github_token`](https://github.com/settings/tokens/new?scopes=repo,read:user,user:email&description=bulletin_board)

## USAGE

Read our [usage guide](USAGE.md) how to properly add information on Bulletin Board.

## Contributing

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## Changelog

Check the [CHANGELOG](CHANGELOG.md) for full release history.

## License

Licensed under [The MIT License](LICENSE).
