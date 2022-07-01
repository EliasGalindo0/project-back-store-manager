const db = require('./connection');

const productsModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.products';
    const [products] = await db.query(sql);
    return products;
  },

  async get(id) {
    const sql = 'SELECT * from StoreManager.products where id = ?';
    const [[product]] = await db.query(sql, [id]);
    return product;
  },
};

module.exports = productsModel;