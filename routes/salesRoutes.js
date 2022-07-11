const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoutes = Router();

salesRoutes.post('/', salesController.add);

module.exports = salesRoutes;