const Joi = require('joi');
const productsModel = require('../models/productsModels');
const { runSchema } = require('./utils');

const productsServices = {
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

  async listAllProducts() {
    const products = await productsModel.list();
    return products;
  },

  async listProductById(id) {
    const product = await productsModel.get(id);
    return product;
  },

  async addProduct(data) {
    const { ...insertId } = data;
    const id = await productsModel.add(insertId);
    return id;
  },

};

module.exports = productsServices;