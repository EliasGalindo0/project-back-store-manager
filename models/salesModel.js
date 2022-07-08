const db = require('./connection');

const salesModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.sales';
    const [sales] = await db.query(sql);
    return sales;
  },

  async get(id) {
    const sql = 'SELECT * from StoreManager.sales where id = ?';
    const [[sale]] = await db.query(sql, [id]);
    return sale;
  },

  async add(data) {
    const sql = 'INSERT INTO StoreManager.sales (name) VALUES (?)';
    const [{ insertId }] = await db.query(sql, [data.name]);
    return insertId;
  },
};

module.exports = salesModel;
