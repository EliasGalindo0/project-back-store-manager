const productsServices = require('../services/productsServices');

const productsController = {
  async listAllProducts(_req, res) {
    const products = await productsServices.listAllProducts();
    res.status(200).json(products);
  },

  async listProductById(req, res) {
    const { id } = await productsServices.validateParamsId(req.params);
    const product = await productsServices.listProductById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  },
};
module.exports = productsController;