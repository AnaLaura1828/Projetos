const Joi = require('joi');

const categoryShema = Joi.object({
    name: Joi.string().required().messages({
        message: '"name" is required',
    }),
});

module.exports = categoryShema;