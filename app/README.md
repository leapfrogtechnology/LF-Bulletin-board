<h1 align="center">Bulletin Board APP</h1>

## Prerequisites

- [Node.js](https://yarnpkg.com/en/docs/install)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

## File structure

```
src/
├── assets/        => represents fonts images
├── components/    => all react components
├── constants/     => constant data
├── services/      => http request services
└── utils/         => helper functions
```

## Setup

### Install dependencies for `APP`

```bash
# Using npm
$ cd app
$ npm install

# Or using yarn
$ cd app
$ yarn
```

#### Make a copy of `.env.example` as `.env` and update your application details and database credentials.

```bash
$ cp .env.example .env
```

#### Adjust the following information on the `.env`

```
# API URL
REACT_APP_BASE_API="http://localhost:8848"
REACT_APP_BASE_API_URL="http://localhost:8848/api"
REACT_APP_GOOGLE_LOGIN_URL="http://localhost:8848/api/auth/google"

# Interval Time To Fetch The Bulletin List (Interval In Minute)
REACT_APP_BULLETIN_FETCH_INTERVAL=${REACT_APP_BULLETIN_FETCH_INTERVAL}

# Google Client ID KEY
REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}
```

## For Development

```bash
# Using npm
$ cd app
$ npm start

# Or using yarn
$ cd app
$ yarn start
```

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<br>

## For Production

```bash
# Using npm
$ cd app
$ npm run build
$ serve -s build

# Or using yarn
$ cd app
$ yarn build
$ serve -s build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

<br>

**Note: Serve is just for illustration purpose for running build file, requires separate serve package to be installed as global for running**

<br>

## Contributing

Read our [contributing guide](../CONTRIBUTING.md) to learn about our development process, how to propose bugs and improvements.

## Change Log

Check the [CHANGELOG](../CHANGELOG.md) for full release history.

## License

Licensed under [The MIT License](../LICENSE).
