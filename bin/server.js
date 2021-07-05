const app = require('../app')
require('dotenv').config()

const { connectMongo } = require('../model/db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectMongo()
    app.listen(PORT, (error) => {
      if (error) {
        console.error(`Error at a server launch: ${error.message}`)
      }
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(`Server not running. Error: ${error.message}`)
    process.exit(1)
  }
}

start()
