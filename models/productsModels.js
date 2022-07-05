const db = require('./connection');

const productsModel = {
  async exists(id) {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [[exists]] = await db.query(sql, [id]);
    return !!exists;
  },

  async list() {
    const sql = 'SELECT * FROM products';
    const [products] = await db.query(sql);
    return products;
  },

  async get(id) {
    const sql = 'SELECT * from products where id = ?';
    const [[product]] = await db.query(sql, [id]);
    return product;
  },

  async add(data) {
    const sql = 'INSERT INTO products (name) VALUES (?)';
    const [{ insertId }] = await db.query(sql, [data.name]);
    return insertId;
  },
};

module.exports = productsModel;