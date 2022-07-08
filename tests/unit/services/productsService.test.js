const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);

const productsModel = require('../../../models/productsModels');
const productsServices = require('../../../services/productsServices');

describe('services/productServices', () => {
  beforeEach(sinon.restore);
  describe('listAllProducts', () => {
    it('deve disparar um erro caso productServices.listAllProducts dispare um erro', () => {
      sinon.stub(productsModel, 'list').rejects();
      chai.expect(productsServices.listAllProducts()).to.eventually.be.rejected;
    })
    it('deve retornar um id caso productServices.listAllProducts retorne um id', () => {
      sinon.stub(productsModel, 'list').resolves([]);
      chai.expect(productsServices.listAllProducts()).to.eventually.equal([]);
    })
  });
  describe('listProductById', () => {
    it('deve disparar um erro caso productServices.listProductById dispare um erro', () => {
      sinon.stub(productsModel, 'get').rejects();
      chai.expect(productsServices.listProductById(1)).to.eventually.be.rejected;
    })
    it('deve retornar um id caso productServices.listProductById retorne um id', () => {
      sinon.stub(productsModel, 'get').resolves({});
      chai.expect(productsServices.listProductById(1)).to.eventually.deep.equal({});
    })
  });
  describe('addProduct', () => {
    it('deve disparar um erro caso productServices.addProduct dispare um erro', () => {
      sinon.stub(productsModel, 'add').rejects();
      chai.expect(productsServices.addProduct({})).to.eventually.be.rejected;
    })
    it('deve retornar um id caso productServices.addProduct retorne um id', () => {
      sinon.stub(productsModel, 'add').resolves(1);
      chai.expect(productsServices.addProduct({})).to.eventually.equal(1);
    })
  });
})
