# React Starter
[![Build Status](https://travis-ci.org/pratishshr/react-starter.svg?branch=master)](https://travis-ci.org/pratishshr/react-starter)
[![Code Climate](https://codeclimate.com/github/pratishshr/react-starter/badges/gpa.svg)](https://codeclimate.com/github/pratishshr/react-starter)

Simple starter kit for React projects.

Comes with:

- [Webpack](https://webpack.js.org/)
- [React Router](https://reacttraining.com/react-router/)
- ES7 [Async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)/[Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [Hot Module Replacement](https://webpack.js.org/guides/hmr-react/)
- SASS/CSS Support
- [Axios](https://github.com/mzabriskie/axios) HTTP Client
- [Jest](https://facebook.github.io/jest/) for Testing
- [Dotenv](https://www.npmjs.com/package/dotenv) for Environment Configurations

## Install

Clone the repository and install dependencies using [yarn](http://yarnpkg.com/).

```bash
$ git clone git@github.com:pratishshr/react-starter.git <project-name>

$ cd <project-name>

$ yarn
```

Start the application in development mode using `yarn start`

## Scripts

The following [commands](package.json) are available:

|Name             |Description                                       |
|-----------------|--------------------------------------------------|
|start            | Start application using webpack-dev-server       |
|lint             | Run linter                                       |
|lint:fix         | Run linter and try to fix errors                 |
|test             | Run tests                                        |
|test:coverage    | Run tests and show code coverage report          |
|build            | Development build                                |
|build:production | Production build                                 |

Run a command using `yarn <command:name>`

## Contribution

For contributions and feature requests, please create an [issue](https://github.com/pratishshr/react-starter/issues).

## License

[MIT](LICENSE.md)
