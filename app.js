const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./src/routes/api/contacts')
const usersRouter = require('./src/routes/api/users')
//  ================================================================================

//  ================================================================================

const filesRouter = require('./src/routes/api/userAvatar')

const { errorHandler } = require('./src/helpers/apiHelpers')

const path = require('path')
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api', express.static(path.join(__dirname, 'public')))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use('/api/users', filesRouter)

app.use(errorHandler)

module.exports = app
