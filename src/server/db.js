const mongoose = require('mongoose');

const MONGO_URI = process.env.TEST
    ? process.env.REACT_APP_MONGO_URI_TEST
    : process.env.REACT_APP_MONGO_URI;

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
    console.log('🚀 we are connected to mongoose!!!!');
    // TODO: Show which environment when loaded.
    console.log(process.env.TEST)
});
