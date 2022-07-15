const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

productsRoutes.delete('/:id', productsController.remove);
productsRoutes.put('/:id', productsController.update);
productsRoutes.get('/search', productsController.getByName);
productsRoutes.get('/:id', productsController.listProductById);
productsRoutes.get('/', productsController.listAllProducts);
productsRoutes.post('/', productsController.addProduct);

module.exports = productsRoutes;