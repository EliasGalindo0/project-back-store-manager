const db = require('./connection');

const salesModel = {

  // async exists(id) {
  //   console.log(id.toString().split(','));
  //   const sql = `
  //     SELECT * 
  //     FROM StoreManager.products
  //     WHERE id = 
  //     IN (?)
  //   `;
  //   const [[exists]] = await db.query(sql, [id]);
  //   // console.log(exists);
  //   return !!exists;
  // },

  async addSaleProduct(saleId, productId, quantity) {
    const sql = `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);
    `;
    const result = await db.query(sql, [saleId, productId, quantity]);
    return result;
  },

  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },
  
  async get() {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sales] = await db.query(query);
    return sales;
  },
  
  async getById(id) {
    const query = `SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
      FROM StoreManager.sales_products AS sp
      INNER JOIN StoreManager.sales AS s
      ON s.id = sp.sale_id
      WHERE sp.sale_id = ?
      ORDER BY sp.sale_id, sp.product_id;`;
    const [sales] = await db.query(query, [id]);
    return sales;
  },
  
  async delete(id) {
    const query = `DELETE FROM StoreManager.sales
      WHERE id = ?;`;
    await db.query(query, [id]);
  },
  
  async put({ id, productId, quantity }) {
    const query = `UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ?
      AND product_id = ?;`;
    await db.query(query, [quantity, id, productId]);
    return { productId, quantity };
  },

};

module.exports = salesModel;
