const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesServices = {
  validateBodyAdd: runSchema(Joi.array().items(Joi.object({
    productId: Joi.number().required().positive().integer()
      .messages({ 'any.required': '"productId" is required' }),
    quantity: Joi.number().required().positive().integer()
      .messages({
        'number.positive': '"quantity" must be greater than or equal to 1',
        'any.required': '"quantity" is required',
      }), 
  }))),

  async get() {
    const sales = await salesModel.list();
    return sales;
  },

  async list(id) {
    const sale = await salesModel.get(id);
    return sale;
  },

  async add(sales) {
    const insertSaleId = await salesModel.addToSale();
    const newSale = sales.map(({ productId, quantity }) => (
      salesModel.addSaleProduct(insertSaleId, productId, quantity)
    ));
    await Promise.all(newSale);
    return { id: insertSaleId, itemsSold: sales };
  },
};

module.exports = salesServices;