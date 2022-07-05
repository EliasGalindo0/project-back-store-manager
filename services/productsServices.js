const Joi = require('joi');
const productsModel = require('../models/productsModels');
const validatorSchema = require('./validatorSchema');

const productsServices = {
  validateBodyAdd: validatorSchema(Joi.object({
    name: Joi.string().required().min(5),
  }).messages({ 
    'any.required': '{{#label}} is required',
    'string.empty': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
  })),

  async validateParamsId(value) {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    });
    const result = await schema.validateAsync(value);
    return result;
  },

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