const Joi = require('joi')
const { ValidationError } = require('../helpers/errors')

const validationUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
    subscription: Joi.string().alphanum().optional(),
  })
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message))
  }
  next()
}

const validationSubscription = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string()
      .alphanum()
      .valid('starter', 'pro', 'business')
      .required(),
  })
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message))
  }
  next()
}

const validationUserEmail = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
  })
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details[0].message))
  }
  next()
}

module.exports = {
  validationUser,
  validationSubscription,
  validationUserEmail,
}
