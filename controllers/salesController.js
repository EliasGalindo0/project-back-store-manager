const SalesError = require('../middlewares/salesError');
const salesServices = require('../services/salesService');

const salesController = {
  async list(_req, res) {
    const sales = await salesServices.list();
    res.status(200).json(sales);
  },

  async get(req, res) {
    const { id } = await salesServices.validateParamsId(req.params);
    const sale = await salesServices.get(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  },

  async add(req, res) {
    const data = await salesServices.validateBodyAdd(req.body);
    if (!data) throw new SalesError('Product not found', 'NotFoundError');
    const sale = await salesServices.add(data);
    return res.status(201).json(sale);
  },
};
module.exports = salesController;