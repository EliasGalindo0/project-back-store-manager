const salesService = require('../services/salesService');

const salesController = {
  async listAllSales(_req, res) {
    const sales = await salesService.listAllSales();
    res.status(200).json(sales);
  },

  async listSalesById(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    const sale = await salesService.listSalesById(id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(sale);
  },

  async addSale(req, res) {
    const data = await salesService.validateBodyAdd(req.body);
    const id = await salesService.addSale(data);
    const sale = await salesService.listSalesById(id);
    res.status(201).json(sale);
  },
};
module.exports = salesController;