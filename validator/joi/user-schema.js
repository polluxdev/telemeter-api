const Joi = require('joi')

module.exports = Joi.object().keys({
  email: Joi.string()
    .required()
    .error(() => 'email required'),
  password: Joi.number()
    .required()
    .error(() => 'password required')
})
