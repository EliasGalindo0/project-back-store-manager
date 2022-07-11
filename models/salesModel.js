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
    const sql = `INSERT INTO StoreManager.sales_products 
    (product_id, sale_id, quantity)
    VALUES(?,?,?);`;
    await db.query(sql, [productId, saleId, quantity]);
    const newSale = { productId, saleId };
    return { newSale };
  },

  async addToSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId: id }] = await db.query(sql);
    console.log(id);
    return id;
  },
  
};

module.exports = salesModel;
