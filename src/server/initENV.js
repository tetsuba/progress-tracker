if (process.env.DEV || process.env.TEST) {
    // Get env file for dev
    // https://github.com/motdotla/dotenv#readme
    const dotenv = require('dotenv');
    dotenv.config();
}
