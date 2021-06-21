const mongoose = require('mongoose')

const connectMongo = async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

// mongoose.connection.on('connected', () => {
//   console.log('Database connection successful')
// })

// mongoose.connection.on('error', (error) => {
//   console.log(`Mongoose connected error: ${error.message}`)
// })

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose disconnection')
// })

// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     console.log('Connection for DB disconnected and app terminated')
//     process.exit()
//   })
// })

module.exports = {
  connectMongo
}
