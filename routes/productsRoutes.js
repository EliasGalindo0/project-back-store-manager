const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.delete('/:id', productsController.remove);
productsRoutes.get('/:id', productsController.listProductById);
productsRoutes.post('/', productsController.addProduct);
productsRoutes.get('/', productsController.listAllProducts);

module.exports = productsRoutes;