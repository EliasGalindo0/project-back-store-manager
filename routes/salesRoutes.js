const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoutes = Router();

salesRoutes.get('/', salesController.get);
salesRoutes.post('/', salesController.add);
salesRoutes.get('/:id', salesController.getById);
salesRoutes.delete('/:id', salesController.delete);
salesRoutes.put('/:id', salesController.put);

module.exports = salesRoutes;