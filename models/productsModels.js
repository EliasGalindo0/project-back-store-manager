const db = require('./connection');

const productsModel = {
  async exists(id) {
    const sql = `
      SELECT id 
      FROM StoreManager.products
    `;
    const [exists] = await db.query(sql, [id]);
    return exists;
  },

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

  async add(data) {
    const sql = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await db.query(sql, [data.name]);
    return insertId;
  },

  async remove(id) {
    const sql = 'DELETE FROM StoreManager.products WHERE id = ?';
    const result = db.query(sql, Number(id));
    return result;
  },

  async update(nameRequest, idRequest) {
      const sql = `UPDATE StoreManager.products SET name =
  ? WHERE id = ?`;
    const [data] = await db.query(sql, [nameRequest, idRequest]);
    if (data.affectedRows >= 1) {
      return { id: idRequest, name: nameRequest };
    }
    return false;
    },

};

module.exports = productsModel;