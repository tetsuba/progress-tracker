const { REACT_APP_NODE_ENV } = process.env

if (REACT_APP_NODE_ENV !== 'prod') {
  // Get env file for dev
  // https://github.com/motdotla/dotenv#readme
  const dotenv = require('dotenv')
  dotenv.config()
}
