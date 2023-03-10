const salesModel = require('../models/salesModel');
const ValidateError = require('../middlewares/ValidateError');
const productsModel = require('../models/productsModels');

const salesServices = {

  async create(body) {
    const validProduct = body.map((productId) => (!!productId.productId));
    if (validProduct.includes(false)) { throw ValidateError(400, '"productId" is required'); }
    
    const quantField = body.every(({ quantity }) => quantity || quantity === 0);
    if (!quantField) { throw ValidateError(400, '"quantity" is required'); }
    
    const quantLength = body.every(({ quantity }) => quantity > 0);
    if (!quantLength) {
      throw ValidateError(422, '"quantity" must be greater than or equal to 1');
    }
    const pId = body.map(async ({ productId }) => productsModel.get(productId));
    const resolves = await Promise.all(pId);
    
    if (resolves.includes(undefined)) throw ValidateError(404, 'Product not found');
    
    const saleId = await salesModel.addSale();
    return { id: saleId, itemsSold: body };
  },

  async get() {
    const result = await salesModel.get();
    const sales = result.map(({ date, product_id: productId, sale_id: saleId, quantity }) => ({
      date,
      saleId,
      productId,
      quantity,
    }));
    return sales;
  },

  async getById(id) {
    const result = await salesModel.getById(id);
    if (result.length === 0) throw ValidateError(404, 'Sale not found');
    const sale = result.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }));
    return sale;
  },
  
  async delete(id) {
    await salesModel.delete(id);
  },

  async put(id, body) {
    const validProduct = body.every(({ productId }) => productId);
    if (!validProduct) { throw ValidateError(400, '"productId" is required'); }

    const quantField = body.every(({ quantity }) => quantity || quantity === 0);
    if (!quantField) { throw ValidateError(400, '"quantity" is required'); }

    const quantLength = body.every(({ quantity }) => quantity > 0);
    if (!quantLength) {
      throw ValidateError(422, '"quantity" must be greater than or equal to 1');
    }

    const pId = body.map(async ({ productId }) => productsModel.get(productId));
    const resolves = await Promise.all(pId);

    if (resolves.includes(undefined)) throw ValidateError(404, 'Product not found');

    await salesModel.put(id, body);
    return { saleId: id, itemsUpdated: body };
  },

  async checkIfExists(id) {
    const exist = await productsModel.exists(id);
    if (!exist) throw ValidateError(404, 'Sale not found');
    return exist;
  },

};

module.exports = salesServices;