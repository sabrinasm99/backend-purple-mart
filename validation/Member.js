const Joi = require('@hapi/joi');

const MemberJoi = Joi.object({
    name: Joi.string().alphanum().required(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().alphanmum().required(),
    address: Joi.string().alphanum().required()
})

module.exports = MemberJoi;