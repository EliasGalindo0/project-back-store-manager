// const ValidateError = require('../middlewares/ValidateError');
const productsModel = require('../models/productsModels');
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
      await salesServices.get();
      res.status(200).json(sales);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

  async getById(req, res, next) {
    try {
      const { id } = await productsServices.validateParamsId(req.params);
      await productsModel.exists(id);
      const sale = await salesServices.getById(id);
      res.status(200).json(sale);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },
  
  async delete(req, res, next) {
    try {
      const { id } = await productsServices.validateParamsId(req.params);
      await salesServices.getById(id);
      await salesServices.delete(id);
      res.sendStatus(204);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

  async put(req, res, next) {
    try {
      const { id } = await productsServices.validateParamsId(req.params);
      const { body } = req;
      await salesServices.checkIfExists(id);
      const update = await salesServices.put(id, body);
      return res.status(200).json(update);
    } catch (err) {
      return err.message
        ? res.status(err.status).json({ message: err.message }) : next(err);
    }
  },

};
module.exports = salesController;