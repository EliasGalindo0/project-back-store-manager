const Joi = require('joi');
const { NotFoundError } = require('../middlewares/errorHandler');
const productsModel = require('../models/productsModels');
const validatorSchema = require('./validatorSchema');

const productsServices = {
  validateBodyAdd: validatorSchema(Joi.object({
    name: Joi.string().required(),
  })),

  async checkIfExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) {
      throw new NotFoundError(id);
    }
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

  async validateParamsId(value) {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    });
    const result = await schema.validateAsync(value);
    return result;
  },

};

module.exports = productsServices;