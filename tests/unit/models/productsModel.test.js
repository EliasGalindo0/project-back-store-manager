const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const db = require('../../../models/connection');
const productsModel = require('../../../models/productsModels');

chai.use(chaiAsPromised);

describe('models/productsModel', () => {
  beforeEach(sinon.restore)
  describe('get', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.get(0)).to.eventually.be.rejected;
    });

    it('deve retornar uma lista vazia caso a consulta não retorne nenhum produto', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.get(0)).to.eventually.be.undefined;
    });
    
    it('deve retornar um objeto caso a consulta retorne um produto', () => {
      sinon.stub(db, 'query').resolves([[{}]]);
      chai.expect(productsModel.get(0)).to.eventually.deep.equal({});
    });

  });
  describe('add', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.add({})).to.eventually.be.rejected;
    });

    it('deve retornar um id caso a consulta retorne um produto', () => {
      sinon.stub(db, 'query').resolves([{ insertId: 0 }]);
      chai.expect(productsModel.get(0)).to.eventually.deep.equal(0);
    });

  });
  describe('list', () => {
    it('deve disparar um erro caso a consulta dispare um erro', () => {
      sinon.stub(db, 'query').rejects();
      chai.expect(productsModel.list(0)).to.eventually.be.rejected;
    });

    it('deve retornar uma lista caso a consulta retorne', () => {
      sinon.stub(db, 'query').resolves([[]]);
      chai.expect(productsModel.list()).to.eventually.deep.equal([]);
    });
  });
  
  });