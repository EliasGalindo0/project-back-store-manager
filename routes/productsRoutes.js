const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoutes = Router();

// productsRoutes.delete('/:id', productsController.removeCharacter);
// productsRoutes.put('/:id', productsController.editCharacter);
productsRoutes.get('/:id', productsController.listProductById);
productsRoutes.get('/', productsController.listAllProducts);
// productsRoutes.post('/', productsController.addCharacter);

module.exports = productsRoutes;