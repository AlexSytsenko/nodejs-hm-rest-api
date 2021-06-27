const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

const validationCreateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().min(7).max(30).optional(),
  })
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message))
  }
  next()
}

const validationUpdateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().min(7).max(30),
  }).min(1)
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message))
  }
  next()
}

const validationUpdateStatusContact = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required()
  })
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message))
  }
  next()
}

module.exports = {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
}
