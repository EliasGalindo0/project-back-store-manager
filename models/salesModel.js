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

  async add(param) {
    const sql = [
      'INSERT INTO sales (date) VALUES (now());',
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?);',
      'SELECT id FROM StoreManager.products order by id desc limit 1;',
    ];

    await Promise.all(param.map(async (e) => {
      const [result] = await db.query(sql[0]);
      await db.query(sql[1], [result.insertId, e.productId, e.quantity]);
    }));

    const [idBigger] = await db.query(sql[2]);
    const aId = Object.values(idBigger);

    return {
      id: Object.values(aId[0])[0], itemsSold: param,
    };
  },

  // async addSaleProduct(saleId, productId, quantity) {
  //   const sql = `INSERT INTO StoreManager.sales_products 
  //   (product_id, sale_id, quantity)
  //   VALUES(?,?,?);`;
  //   await db.query(sql, [productId, saleId, quantity]);
  //   const newSale = { productId, saleId };
  //   return { newSale };
  // },

  // async addToSale() {
  //   const sql = 'INSERT INTO StoreManager.sales (date) VALUES (NOW());';
  //   const [{ insertId: id }] = await db.query(sql);
  //   console.log(id);
  //   return id;
  // },
  
};

module.exports = salesModel;
