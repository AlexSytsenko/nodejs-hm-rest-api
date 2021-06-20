const app = require('../app')
require('dotenv').config()

const { connectMongo } = require('../model/db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  await connectMongo()

  app.listen(PORT, err => {
    if (err) {
      console.error('error at a server launch:', err)
    }
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
