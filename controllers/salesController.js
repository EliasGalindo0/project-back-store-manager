const salesModel = require('../models/salesModel');
const productsServices = require('../services/productsServices');
const salesServices = require('../services/salesService');

const salesController = {
  
  async add(req, res, next) {
    try {
      const { body } = req;
      const sale = await salesServices.create(body);
      return res.status(201).json(sale);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

  async get(_req, res) {
    const sales = await salesServices.get();
    res.status(200).json(sales);
  },

  async getById(req, res) {
    const { id } = await productsServices.validateParamsId(req.params);
    const sale = await salesServices.getById(id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  },
  
  async delete(req, res) {
    const { id } = req.params;
    await salesModel.exists(id);
    if (!id) return res.status(404).json({ message: 'Sale not found' });
    await salesServices.delete(id);
    res.sendStatus(204);
  },

  async put(req, res) {
    const { id } = req.params;
    const { body } = req;
    const { code, update, message } = await salesServices.put(id, body);
    if (message) return res.status(code).json({ message });
    res.status(201).json(update);
  },

};
module.exports = salesController;