const Joi = require('joi');
const ValidateError = require('../middlewares/ValidateError');
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
    if (!data) throw ValidateError(404, 'Product not found');
    const id = await productsModel.add(insertId);
    return id;
  },

  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throw ValidateError(404, 'Product not found');
    return exists;
  },

  async remove(id) {
    const result = productsModel.remove(id);
    return result;
  },

  async update(name, id) {
    const product = await productsModel.update(name, id);
      return product;
    },
};

module.exports = productsServices;