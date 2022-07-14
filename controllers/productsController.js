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

  async addProduct(req, res) {
      const data = await productsServices.validateBodyAdd(req.body);
      const id = await productsServices.addProduct(data);
      const product = await productsServices.listProductById(id);
      res.status(201).json(product);
  },

  async remove(req, res, next) {
    try {
      const { id } = await productsServices.validateParamsId(req.params);
      await productsServices.checkIfExists(id);
      await productsServices.remove(id);
      return res.sendStatus(204);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
    },
  
  async update(req, res) {
    const { id } = req.params;
    const { name } = await productsServices.validateBodyAdd(req.body);
    const product = await productsServices.update(name, id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  },

  };
module.exports = productsController;