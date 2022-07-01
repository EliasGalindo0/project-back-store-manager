const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.get('/:id', productsController.listProductById);
productsRoutes.get('/', productsController.listAllProducts);

module.exports = productsRoutes;