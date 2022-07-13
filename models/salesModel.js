const db = require('./connection');

const salesModel = {

  async exists() {
    const sql = `
      SELECT id 
      FROM StoreManager.products
    `;
    const [exists] = await db.query(sql);
    return exists;
  },

  async addSaleProduct(saleId, productId, quantity) {
    const sql = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
    `;
    const result = await db.query(sql, [saleId, productId, quantity]);
    return result;
  },

  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const saleTime = await db.query(sql);
    const [result] = saleTime;
    const { insertId } = result;
    return insertId;
  },
  
};

module.exports = salesModel;
