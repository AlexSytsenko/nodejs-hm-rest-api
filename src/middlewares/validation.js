const Joi = require('joi')

const validationCreateContact = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().min(7).max(30).optional(),
  })
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details })
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
    return res.status(400).json({ status: validationResult.error.details })
  }
  next()
}

module.exports = { validationCreateContact, validationUpdateContact }