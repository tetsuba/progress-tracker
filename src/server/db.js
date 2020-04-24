const mongoose = require('mongoose')

console.log(process.env.REACT_APP_CUSTOM_NODE_ENV)
console.log('MONGO_URI: ', process.env.REACT_APP_MONGO_URI)

mongoose.connect(process.env.REACT_APP_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async function () {
  console.log('🚀 we are connected to mongoose!!!!')
  // TODO: Show which environment when loaded.
})
