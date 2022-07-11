const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesServices = {
  validateParamsId: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  }).messages({
    'any.required': '{{#label}} is required',
    'string.empty': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
  })),

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
    const insertSaleId = await salesModel.addSaleId();
    const isertIntoSalesProducts = sales.map(({ productId, quantity }) => (
      salesModel.addSaleProduct(insertSaleId, productId, quantity)
    ));
    await Promise.all(isertIntoSalesProducts);
    return { id: insertSaleId, itemsSold: sales };
  },
};

module.exports = salesServices;