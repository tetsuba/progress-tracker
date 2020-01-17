if (process.env.DEV) {
    // Get env file for dev
    // https://github.com/motdotla/dotenv#readme
    const dotenv = require('dotenv');
    dotenv.config();
}
