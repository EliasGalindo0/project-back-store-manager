const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoutes = Router();

salesRoutes.delete('/:id', salesController.delete);
salesRoutes.get('/:id', salesController.getById);
salesRoutes.put('/:id', salesController.put);
salesRoutes.get('/', salesController.get);
salesRoutes.post('/', salesController.add);

module.exports = salesRoutes;