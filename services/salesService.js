const salesModel = require('../models/salesModel');
const ValidateError = require('../middlewares/ValidateError');

const salesServices = {

  async create(body) {
    // const { error } = schema.validate(body);
    // if (error) throw ValidateError(error.details, error.message);

    const validProduct = body.every(({ productId }) => productId);
    if (!validProduct) { throw ValidateError(400, '"productId" is required'); }

    const quantField = body.every(({ quantity }) => quantity || quantity === 0);
    if (!quantField) { throw ValidateError(400, '"quantity" is required'); }

    const quantLength = body.every(({ quantity }) => quantity > 0);
    if (!quantLength) {
      throw ValidateError(422, '"quantity" must be greater than or equal to 1');
    }
    const saleId = await salesModel.addSale();

    const products = await salesModel.exists(saleId);
    const validId = products.map((product) => product.id);
    const bodyId = body.map((item) => item.productId);
    const exists = bodyId.every((item) => validId.includes(item));
    if (!exists) throw ValidateError(404, 'Product not found');

    return { id: validId[validId.length - 1], itemsSold: body };
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
    const exists = await salesServices.getById(id);
    if (exists.length === 0) throw ValidateError(404, 'Sale not found');
    await salesModel.delete(id);
  },

};

module.exports = salesServices;