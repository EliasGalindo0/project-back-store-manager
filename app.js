const express = require('express');
require('express-async-errors');
const productsRoutes = require('./routes/productsRoutes');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRoutes);

// app.use((err, _req, res, _next) => {
//   switch (err.name) {
//     case 'throwError':
//       res.status(400).json({ message: err.message });
//       break;
//     case 'NotFoundError':
//       res.status(404).json({ message: 'Product not found' });
//       break;
//     default:
//       res.status(500).json({ message: err.message });
//   }
// });

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;