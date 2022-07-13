const Joi = require('joi');
const salesModel = require('../models/salesModel');
const ValidateError = require('../middlewares/ValidateError');

const schema = Joi.array().items(Joi.object({
  productId: Joi.number().required().positive().integer()
    .messages({ 'any.required': '"productId" is required' }),
  quantity: Joi.number().required().positive().integer()
    .messages({
      'number.positive': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
}));

const salesServices = {

  async create(body) {
    const { error } = schema.validate(body);
    console.log(error);
    if (error) throw ValidateError(422, error.message);

    const saleId = await salesModel.addSale();
    if (!saleId) throw ValidateError(404, 'Bad erquest');

    const products = await salesModel.exists();
    const id = products.map((product) => product.id);
    const bodyId = body.map((item) => item.productId);
    const exists = bodyId.every((item) => id.includes(item));

    if (!exists) throw ValidateError(404, 'Product not found');
    return { id: saleId, itemsSold: body };
  },
};

module.exports = salesServices;