const express = require('express');
require('express-async-errors');
const errorNotFound = require('./middlewares/errorNotFound');
const productsRoutes = require('./routes/productsRoutes');
const errorValidation = require('./middlewares/errorValidation');
const salesRoutes = require('./routes/salesRoutes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

app.use(errorValidation, errorNotFound, (err, _req, res, _next) =>
  res.status(500).json({ message: 'Internal server error' }));

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;