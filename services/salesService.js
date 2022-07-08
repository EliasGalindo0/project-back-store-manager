const Joi = require('joi');
const salesModel = require('../models/salesModel');
const { runSchema } = require('./utils');

const salesServices = {
  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required().min(5),
  }).messages({
    'any.required': '{{#label}} is required',
    'string.empty': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
  })),

  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  async listAllSales() {
    const sales = await salesModel.list();
    return sales;
  },

  async listSalesById(id) {
    const sale = await salesModel.get(id);
    return sale;
  },

  async addSale(data) {
    const { ...insertId } = data;
    const id = await salesModel.add(insertId);
    return id;
  },
};

module.exports = salesServices;