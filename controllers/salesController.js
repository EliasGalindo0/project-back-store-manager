// const ValidateError = require('../middlewares/ValidateError');
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

  async get(_req, res, next) {
    try {
      const sales = await salesServices.get();
      // if (!sales) throw ValidateError(404, 'Sale not found');
      res.status(200).json(sales);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = await productsServices.validateParamsId(req.params);
      await salesModel.exists(id);
      const sale = await salesServices.getById(id);
      // if (!sale) throw ValidateError(404, 'Sale not found');
      res.status(200).json(sale);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },
  
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await salesModel.exists(id);
      await salesServices.delete(id);
      res.sendStatus(204);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

  async put(req, res, next) {
    try {
      const { id } = req.params;
      const { body } = req;
      const { code, update, message } = await salesServices.put(id, body);
      if (message) return res.status(code).json({ message });
      res.status(201).json(update);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

};
module.exports = salesController;