const salesService = require('../services/salesService');

const salesController = {
  async list(_req, res) {
    const sales = await salesService.list();
    res.status(200).json(sales);
  },

  async get(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    const sale = await salesService.get(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  },

  async add(req, res) {
    const data = await salesService.validateBodyAdd(req.body);
    const sale = await salesService.add(data);
    if (!sale) return res.status(400).json({ message: 'Product not found' });
    return res.status(201).json(sale);
  },
};
module.exports = salesController;