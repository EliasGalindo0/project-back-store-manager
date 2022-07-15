const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');
const salesModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('models/salesModel', () => {
  beforeEach(sinon.restore)
  describe('get', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.getById(0)).to.eventually.be.rejected;
    });

    it('deve retornar uma lista vazia caso a consulta não retorne nenhum produto', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(salesModel.getById(0)).to.eventually.be.undefined;
    });

    it('deve retornar um objeto caso a consulta retorne um produto', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(salesModel.getById(0)).to.eventually.deep.equal({});
    });

  });
  describe('addSalesProduct', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.addSaleProduct({})).to.eventually.be.rejected;
    });

    it('deve retornar um id caso a consulta retorne um produto', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 0 }]);
      chai.expect(salesModel.getById(0)).to.eventually.deep.equal(0);
    });

    it('deve retornar as informações caso a consulta retorne', () => {
      sinon.stub(db, 'query').resolves({});
      chai.expect(salesModel.addSaleProduct({})).to.eventually.deep.equal({});
    });

  });
  describe('list', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.get(0)).to.eventually.be.rejected;
    });

    it('deve retornar uma lista caso a consulta retorne', () => {
      sinon.stub(db, 'query').resolves([{}]);
      chai.expect(salesModel.get()).to.eventually.equal({});
    });
  });
  describe('exists', () => {
    it('deve disparar um erro caso não exista o id buscado', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.exists()).to.eventually.be.undefined;
    });
    
    it('deve retornar uma lista caso exista o id buscado', () => {
      sinon.stub(db, 'query').resolves([]);
      chai.expect(productsModel.exists()).to.eventually.equal([]);
    });
  });
  describe('addSale', () => {
    it('deve retornar um id da venda realizada', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 0 }]);
      chai.expect(salesModel.addSale(0)).to.eventually.deep.equal(0);
    });
  });
  describe('delete', () => {
    it('deve disparar um erro caso não exista o id buscado', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(salesModel.delete()).to.eventually.be.undefined;
      });
    });

    describe('put', () => {
      it('deve disparar um erro caso não exista o id buscado', () => {
        sinon.stub(db, 'query').rejects();
        chai.expect(salesModel.put()).to.eventually.be.undefined;
      });
    
      it('deve alterar uma venda', () => {
        sinon.stub(db, 'query').resolves({});
        chai.expect(salesModel.put()).to.eventually.deep.equal({});
      });
    });
});