const db = require('./connection');

const salesModel = {
  async list() {
    const sql = 'SELECT * FROM StoreManager.sales';
    const [sales] = await db.query(sql);
    return sales;
  },

  async get(id) {
    const sql = 'SELECT * from StoreManager.sales where id = ?;';
    const [[sale]] = await db.query(sql, [id]);
    return sale;
  },

  async addSaleProduct(saleId, productId, quantity) {
    const sql = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
    `;
    await db.query(sql, [saleId, productId, quantity]);
  },

  async addSaleId() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const saleTime = await db.query(sql);
    const [result] = saleTime;
    const { insertId } = result;
    return insertId;
  },
  
};

module.exports = salesModel;
