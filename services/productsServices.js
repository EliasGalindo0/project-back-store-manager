const Joi = require('joi');
const productsModel = require('../models/productsModels');

const productsServices = {

  async listAllProducts() {
    const products = await productsModel.list();
    return products;
  },

  async listProductById(id) {
    const product = await productsModel.get(id);
    return product;
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