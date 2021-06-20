const app = require('../app')
require('dotenv').config()

// const MongoClient = require('mongodb').MongoClient

const { connectMongo } = require('../model/db/connection')

const PORT = process.env.PORT || 3000

const start = async () => {
  await connectMongo()
  // const client = await MongoClient.connect(process.env.MONGO_URL, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  // const db = client.db('db-contacts')
  // const Contacts = db.collection('contacts')
  // const contacts = await Contacts.find({}).toArray()
  // console.log(contacts)

  app.listen(PORT, err => {
    if (err) {
      console.error('error at a server launch:', err)
    }
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}

start()
