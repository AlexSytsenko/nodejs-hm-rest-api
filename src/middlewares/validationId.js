const mongoose = require('mongoose')
const { ValidationError } = require('../helpers/errors')

const checkObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    next(new ValidationError('Invalid id'))
  }
  next()
}

module.exports = { checkObjectId }
