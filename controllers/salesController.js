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
};
module.exports = salesController;