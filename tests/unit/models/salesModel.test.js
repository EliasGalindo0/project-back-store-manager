const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('models/salesModel', () => {
  describe('addSale', () => {
    beforeEach(() => {
      sinon.stub(db, 'query').returns([{ insertId: 3 }]);
    });
    afterEach(() => {
      sinon.restore();
    });
    it('deve retornar um id da venda', async () => {
      const response = await salesModel.addSale();
      expect(response).to.be.equal(3);
    });
  });
  describe('addSaleProduct', () => {
    beforeEach(() => {
      sinon.stub(db, 'query');
    });
    afterEach(() => {
      sinon.restore();
    });
    it('deve retornar as informações dos produtos adicionados', async () => {
      const response = await salesModel
        .addSaleProduct({ saleId: 1, productId: 2, quantity: 1 });
      expect(response).to.be.deep.equal({ productId: 2, quantity: 1 });
    });
  });
  // describe('get', () => {
  //   beforeEach(() => {
  //     sinon.stub(db, 'query').returns([mockSalesBefore]);
  //   });
  //   afterEach(() => {
  //     sinon.restore();
  //   });
  //   it('should return an array', async () => {
  //     const response = await salesModel.getAll();
  //     expect(response).to.be.a('array');
  //   });
  //   it('should return an array of sales', async () => {
  //     const response = await salesModel.getAll();
  //     expect(response).to.be.deep.equal(mockSalesBefore);
  //   });
  // });
  // describe('The function findById', () => {
  //   beforeEach(() => {
  //     sinon.stub(db, 'query').returns([[mockSalesBefore[0]]]);
  //   });
  //   afterEach(() => {
  //     sinon.restore();
  //   });
  //   it('should return an array', async () => {
  //     const response = await salesModel.findById();
  //     expect(response).to.be.a('array');
  //   });
  //   it('should return an array of sales', async () => {
  //     const response = await salesModel.findById();
  //     expect(response[0]).to.be.deep.equal(mockSalesBefore[0]);
  //   });
  // });
  // describe('The function delete', () => {
  //   beforeEach(() => {
  //     sinon.stub(db, 'query').resolves();
  //   });
  //   afterEach(() => {
  //     sinon.restore();
  //   });
  //   it('should return a boolean', async () => {
  //     const response = await salesModel.delete(1);
  //     expect(response).to.be.a('boolean');
  //   });
  //   it('should return true', async () => {
  //     const response = await salesModel.delete(1);
  //     expect(response).to.be.equal(true);
  //   });
  // });
  // describe('The function updateSale', () => {
  //   beforeEach(() => {
  //     sinon.stub(db, 'query').resolves();
  //   });
  //   afterEach(() => {
  //     sinon.restore();
  //   });
  //   it('returns an object', async () => {
  //     const response = await salesModel
  //       .updateSale({ id: 1, productId: 1, quantity: 1 });
  //     expect(response).to.be.a('object');
  //   });
  //   it('the object must have the productId and the quantity', async () => {
  //     const response = await salesModel
  //       .updateSale({ id: 1, productId: 1, quantity: 1 });
  //     expect(response).to.be.deep.equal({ productId: 1, quantity: 1 });
  //   });
  // });
});